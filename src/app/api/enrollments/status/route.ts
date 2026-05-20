import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(req: Request) {
  try {
    const { userId: clerk_user_id } = await auth();

    if (!clerk_user_id) {
      return NextResponse.json(
        { error: 'Unauthorized: Log in required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID parameter is required' },
        { status: 400 }
      );
    }

    // Query Supabase for active enrollment
    const { data, error } = await supabaseAdmin
      .from('enrollments')
      .select('*')
      .eq('clerk_user_id', clerk_user_id)
      .eq('course_id', courseId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) {
      console.error('Supabase query error checking enrollment status:', error);
      return NextResponse.json(
        { error: 'Database check failed' },
        { status: 500 }
      );
    }

    if (data) {
      return NextResponse.json({ enrolled: true, enrollment: data });
    }

    return NextResponse.json({ enrolled: false });
  } catch (error) {
    console.error('Unhandled error in enrollment status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
