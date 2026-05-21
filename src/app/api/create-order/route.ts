import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Razorpay from 'razorpay';
import { getRegistrationStatus } from '@/lib/registration/server';
import { courses, Course } from '@/data/courses';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { status, error: registrationError } = await getRegistrationStatus(userId);

    if (registrationError) {
      console.error('Registration status lookup failed before order creation:', registrationError);
      return NextResponse.json(
        { error: 'Failed to validate registration status before payment.' },
        { status: 500 }
      );
    }

    if (!status.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in before enrolling.' },
        { status: 401 }
      );
    }

    if (!status.registered) {
      return NextResponse.json(
        { error: 'Complete your student registration before enrolling in any program.' },
        { status: 403 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'placeholder',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder',
    });

    const body = await req.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // Fetch course from courses data to ensure price is accurate
    const course = courses.find((c: Course) => c.id === courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const amount = course.price * 100; // Razorpay expects amount in paise
    const currency = 'INR';

    const options = {
      amount: amount.toString(),
      currency,
      receipt: `receipt_${Date.now()}_${courseId}`,
      payment_capture: 1, // Auto capture
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    const err = error as { message?: string } | null | undefined;
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
