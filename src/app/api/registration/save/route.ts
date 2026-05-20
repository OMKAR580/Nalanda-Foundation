import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { saveStudentRegistration } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Log in required' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // 1. Validate Personal Information
    const requiredPersonal = [
      'full_name',
      'date_of_birth',
      'gender',
      'parent_guardian_name',
      'mobile_number',
      'email',
      'permanent_address',
      'city',
      'state',
      'pin_code'
    ];

    for (const key of requiredPersonal) {
      if (!body[key] || body[key].toString().trim() === '') {
        return NextResponse.json(
          { error: `Personal Information error: Field '${key.replace(/_/g, ' ')}' is required.` },
          { status: 400 }
        );
      }
    }

    // Phone validation
    const phone = body.mobile_number.toString().trim();
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Personal Information error: Mobile number must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    // Email validation
    const email = body.email.toString().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Personal Information error: Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 2. Validate Academic Information
    const requiredAcademic = [
      'university_name',
      'college_name',
      'degree',
      'department_stream',
      'class_semester',
      'academic_session',
      'university_roll_number',
      'university_registration_number',
      'course_program'
    ];

    for (const key of requiredAcademic) {
      if (!body[key] || body[key].toString().trim() === '') {
        return NextResponse.json(
          { error: `Academic Information error: Field '${key.replace(/_/g, ' ')}' is required.` },
          { status: 400 }
        );
      }
    }

    // 3. Validate Internship Preferences
    if (!body.internship_programs || !Array.isArray(body.internship_programs) || body.internship_programs.length < 2) {
      return NextResponse.json(
        { error: 'Internship Preferences error: You must select a minimum of 2 internship programs.' },
        { status: 400 }
      );
    }

    const requiredPreferences = [
      'first_preference',
      'preferred_mode',
      'laptop_device_availability',
      'internet_availability',
      'why_join'
    ];

    for (const key of requiredPreferences) {
      if (!body[key] || body[key].toString().trim() === '') {
        return NextResponse.json(
          { error: `Internship Preferences error: Field '${key.replace(/_/g, ' ')}' is required.` },
          { status: 400 }
        );
      }
    }

    // 4. Validate Emergency Contacts
    const requiredEmergency = [
      'emergency_contact_name',
      'emergency_contact_number',
      'emergency_contact_relationship'
    ];

    for (const key of requiredEmergency) {
      if (!body[key] || body[key].toString().trim() === '') {
        return NextResponse.json(
          { error: `Emergency Contact error: Field '${key.replace(/_/g, ' ')}' is required.` },
          { status: 400 }
        );
      }
    }

    const emergencyPhone = body.emergency_contact_number.toString().trim();
    if (!/^\d{10}$/.test(emergencyPhone)) {
      return NextResponse.json(
        { error: 'Emergency Contact error: Emergency contact number must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    // 5. Validate Consents
    if (!body.declaration_consent || !body.terms_agreed) {
      return NextResponse.json(
        { error: 'Consent error: You must check both declaration and terms checkboxes.' },
        { status: 400 }
      );
    }

    // All checked. Save into Supabase.
    const { data, error } = await saveStudentRegistration(userId, body);

    if (error) {
      console.error('Supabase error saving student registration:', error);
      return NextResponse.json(
        { error: 'Failed to save registration data to Supabase database', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration form submitted and saved successfully.',
      data
    });
  } catch (error) {
    console.error('Unhandled error in registration save API:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred while processing registration form.' },
      { status: 500 }
    );
  }
}
