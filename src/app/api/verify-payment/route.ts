import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { courses } from '@/data/courses';

export async function POST(req: Request) {
  try {
    const { userId: clerk_user_id } = await auth();

    if (!clerk_user_id) {
      return NextResponse.json({ error: 'Unauthorized: You must be logged in' }, { status: 401 });
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Payment verification failed: Course ID is required' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json({ error: 'Server misconfiguration: Razorpay secret missing' }, { status: 500 });
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed: Invalid signature' }, { status: 400 });
    }

    // Fetch course details
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return NextResponse.json({ error: 'Payment verification failed: Course not found' }, { status: 404 });
    }

    // 1. Insert into payments table
    const { error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        clerk_user_id,
        course_id: courseId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: course.price,
        currency: 'INR',
        status: 'captured',
      });

    if (paymentError) {
      console.error('Supabase payment insert failed:', paymentError);
      return NextResponse.json(
        { error: 'Failed to record payment in database', details: paymentError.message },
        { status: 500 }
      );
    }

    // 2. Insert/upsert into enrollments table
    const { error: enrollmentError } = await supabaseAdmin
      .from('enrollments')
      .upsert(
        {
          clerk_user_id,
          course_id: courseId,
          course_slug: course.slug,
          status: 'active',
        },
        { onConflict: 'clerk_user_id,course_slug' }
      );

    if (enrollmentError) {
      console.error('Supabase enrollment upsert failed:', enrollmentError);
      return NextResponse.json(
        { error: 'Failed to record enrollment in database', details: enrollmentError.message },
        { status: 500 }
      );
    }

    console.log(`Supabase transaction success: Enrolled user ${clerk_user_id} to course ${course.slug}`);

    return NextResponse.json({ success: true, message: 'Payment verified and enrollment completed successfully' });
  } catch (error) {
    const err = error as { message?: string } | null | undefined;
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment', details: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
