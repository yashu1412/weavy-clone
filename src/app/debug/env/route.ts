import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'SET' : 'NOT SET',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'SET' : 'NOT SET',
    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY ? 'SET' : 'NOT SET',
    // TRIGGER_API_KEY: process.env.TRIGGER_API_KEY ? 'SET' : 'NOT SET',
    TRIGGER_API_URL: process.env.TRIGGER_API_URL || 'NOT SET',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET',
  };

  return NextResponse.json(envVars);
}
