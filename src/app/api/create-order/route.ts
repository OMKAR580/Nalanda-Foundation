import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { courses, Course } from '@/data/courses';

export async function POST(req: Request) {
  try {
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
