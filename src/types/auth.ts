// ─── Auth Types ────────────────────────────────────────────────────────────────

export interface RegisterFormValues {
  email: string;
  password: string;
  confirm: string;
}

export interface RegisterFormErrors {
  email?: string;
  password?: string;
  confirm?: string;
}

export type RegisterFormField = keyof RegisterFormValues;
