export type RegistrationFieldValue =
  | string
  | number
  | boolean
  | string[]
  | null
  | undefined;

export type RegistrationRecord = {
  registration_completed?: boolean | null;
  [key: string]: RegistrationFieldValue;
};

export interface RegistrationStatusPayload {
  authenticated: boolean;
  registered: boolean;
  registration: RegistrationRecord | null;
}

export const unauthenticatedRegistrationStatus: RegistrationStatusPayload = {
  authenticated: false,
  registered: false,
  registration: null,
};
