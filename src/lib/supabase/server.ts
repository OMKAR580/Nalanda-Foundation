import { createClient } from '@supabase/supabase-js';

// Server-side Supabase instance with Service Role Key
// IMPORTANT: Never expose SUPABASE_SERVICE_ROLE_KEY to the frontend
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper functions for database operations
export async function getUserEnrollments(userId: string) {
  if (!userId) {
    return { data: [], error: new Error('User ID is required') };
  }
  const { data, error } = await supabaseAdmin
    .from('enrollments')
    .select('*')
    .eq('clerk_user_id', userId);
  return { data: data || [], error };
}

export async function getUserPayments(userId: string) {
  if (!userId) {
    return { data: [], error: new Error('User ID is required') };
  }
  const { data, error } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('clerk_user_id', userId)
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function getUserFavorites(userId: string) {
  if (!userId) {
    return { data: [], error: new Error('User ID is required') };
  }
  const { data, error } = await supabaseAdmin
    .from('favorites')
    .select('*')
    .eq('clerk_user_id', userId);
  return { data: data || [], error };
}

// Student Registration database helpers
export async function getStudentRegistration(clerkUserId: string) {
  if (!clerkUserId) {
    return { data: null, error: new Error('Clerk User ID is required') };
  }
  const { data, error } = await supabaseAdmin
    .from('student_registrations')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .maybeSingle();
  return { data, error };
}

export async function saveStudentRegistration(clerkUserId: string, data: Record<string, unknown>) {
  if (!clerkUserId) {
    return { data: null, error: new Error('Clerk User ID is required') };
  }
  const payload: Record<string, unknown> = {
    ...data,
    clerk_user_id: clerkUserId,
    registration_completed: true,
    updated_at: new Date().toISOString()
  };

  const upsertRegistration = async (registrationPayload: Record<string, unknown>) =>
    supabaseAdmin
      .from('student_registrations')
      .upsert(registrationPayload, { onConflict: 'clerk_user_id' })
      .select()
      .single();

  let { data: res, error } = await upsertRegistration(payload);

  if (
    error &&
    Object.prototype.hasOwnProperty.call(payload, 'other_college_name') &&
    /other_college_name/i.test(error.message)
  ) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.other_college_name;

    ({ data: res, error } = await upsertRegistration(fallbackPayload));
  }

  return { data: res, error };
}
