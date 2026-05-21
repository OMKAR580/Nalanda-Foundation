import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getRegistrationStatus } from '@/lib/registration/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();
    const { status, error } = await getRegistrationStatus(userId);

    if (error) {
      console.error('Supabase query error checking registration status:', error);
      return NextResponse.json(
        { error: 'Failed to load registration status from Supabase.' },
        { status: 500 }
      );
    }

    return NextResponse.json(status, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Unhandled error in registration status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
