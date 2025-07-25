# Development Setup Guide

## 🚀 Quick Start

The server is now running at: **http://localhost:3000/signup**

## 📋 Setup Steps Completed

✅ Installed dependencies (bcryptjs, zod, resend, @prisma/client)  
✅ Generated Prisma client  
✅ Created environment variables file  
✅ Started development server  

## 🗄️ Database Setup (Required)

You need to set up a PostgreSQL database and update the DATABASE_URL in `.env.local`:

### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
brew install postgresql  # macOS
# or use Docker
docker run --name marginalia-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Update .env.local with your database URL
DATABASE_URL="postgresql://username:password@localhost:5432/marginalia?schema=public"

# Push the schema to your database
npx prisma db push
```

### Option 2: Free Cloud Database (Neon, Supabase, etc.)
1. Create a free PostgreSQL database
2. Copy the connection URL to `.env.local`
3. Run: `npx prisma db push`

## 📧 Email Setup (Optional for Testing)

For email verification to work:
1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Update `RESEND_API_KEY` in `.env.local`

**Note:** Without email setup, signup will work but email verification will fail.

## 🔧 Available Commands

```bash
npm run dev          # Start development server
npx prisma studio    # Database GUI
npx prisma db push   # Update database schema
npx prisma generate  # Regenerate client
```

## 🎯 Test the Signup

1. Go to http://localhost:3000/signup
2. Fill out the form with:
   - Name: Test User
   - Email: test@example.com
   - Username: testuser
   - Password: TestPass123

## 🛠️ Current Features

✅ Real-time username availability checking  
✅ Password strength indicator  
✅ Form validation with error states  
✅ Rate limiting (5 attempts/minute)  
✅ Secure password hashing (bcryptjs)  
✅ Input sanitization and validation  
✅ Responsive design  

## 🐛 Troubleshooting

- **Database errors**: Make sure PostgreSQL is running and DATABASE_URL is correct
- **Email errors**: Check RESEND_API_KEY or temporarily disable email verification
- **Import errors**: Run `npx prisma generate` if you see Prisma client errors