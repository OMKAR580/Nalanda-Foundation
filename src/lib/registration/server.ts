import { getStudentRegistration } from "@/lib/supabase/server";
import {
  type RegistrationRecord,
  type RegistrationStatusPayload,
  unauthenticatedRegistrationStatus,
} from "@/lib/registration/types";

export async function getRegistrationStatus(clerkUserId?: string | null): Promise<{
  status: RegistrationStatusPayload;
  error: unknown | null;
}> {
  if (!clerkUserId) {
    return {
      status: unauthenticatedRegistrationStatus,
      error: null,
    };
  }

  const { data, error } = await getStudentRegistration(clerkUserId);

  if (error) {
    return {
      status: {
        authenticated: true,
        registered: false,
        registration: null,
      },
      error,
    };
  }

  const registration = (data ?? null) as RegistrationRecord | null;

  return {
    status: {
      authenticated: true,
      registered: Boolean(registration?.registration_completed),
      registration,
    },
    error: null,
  };
}
