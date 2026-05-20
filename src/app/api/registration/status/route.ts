import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getStudentRegistration } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Log in required' },
        { status: 401 }
      );
    }

    const { data, error } = await getStudentRegistration(userId);

    if (error) {
      console.error('Supabase query error checking registration status:', error);
      return NextResponse.json(
        { error: 'Failed to load registration status from Supabase.' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({
        registered: false,
        registration: null
      });
    }

    return NextResponse.json({
      registered: true,
      registration: data
    });
  } catch (error) {
    console.error('Unhandled error in registration status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
