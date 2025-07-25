import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { signupRateLimiter } from '@/lib/rate-limiter';
import { sendEmail, generateVerificationEmailHTML } from '@/lib/email';

const prisma = new PrismaClient();

const signupSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters')
    .transform(str => str.trim()),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .transform(str => str.toLowerCase().trim()),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .transform(str => str.toLowerCase().trim()),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('x-vercel-forwarded-for');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (remoteAddr) {
    return remoteAddr;
  }
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    const rateLimitResult = signupRateLimiter.check(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          message: 'Too many signup attempts. Please try again later.',
          retryAfter: rateLimitResult.resetTime 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { name, email, username, password } = validationResult.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      },
      select: { id: true }
    });

    if (existingUser) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      return NextResponse.json(
        { message: 'Email or username already exists' },
        { status: 409 }
      );
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        verificationToken,
        verificationExpires,
        isVerified: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        isVerified: true
      }
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken}`;
    
    try {
      await sendEmail({
        to: email,
        subject: 'Verify your marginalia account',
        html: generateVerificationEmailHTML(name, verificationUrl)
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      
      await prisma.user.delete({
        where: { id: user.id }
      });
      
      return NextResponse.json(
        { message: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Account created successfully. Please check your email to verify your account.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}