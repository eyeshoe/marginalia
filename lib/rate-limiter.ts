interface RateLimit {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits = new Map<string, RateLimit>();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  check(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const limit = this.limits.get(identifier);

    if (!limit || now > limit.resetTime) {
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { allowed: true };
    }

    if (limit.count >= this.maxAttempts) {
      return { 
        allowed: false, 
        resetTime: limit.resetTime 
      };
    }

    limit.count++;
    return { allowed: true };
  }

  cleanup() {
    const now = Date.now();
    for (const [key, limit] of this.limits.entries()) {
      if (now > limit.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

export const signupRateLimiter = new RateLimiter(5, 60000);
export const usernameCheckRateLimiter = new RateLimiter(10, 60000);

setInterval(() => {
  signupRateLimiter.cleanup();
  usernameCheckRateLimiter.cleanup();
}, 300000); // Cleanup every 5 minutes