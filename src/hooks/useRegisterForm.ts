import { useState } from "react";
import type {
  RegisterFormValues,
  RegisterFormErrors,
  RegisterFormField,
} from "../types/auth";

// ─── Constants ─────────────────────────────────────────────────────────────────

const INITIAL_VALUES: RegisterFormValues = {
  email: "",
  password: "",
  confirm: "",
};

// ─── Validation ────────────────────────────────────────────────────────────────

function validate(values: RegisterFormValues): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters";
  }

  if (!values.confirm) {
    errors.confirm = "Please confirm your password";
  } else if (values.confirm !== values.password) {
    errors.confirm = "Passwords don't match";
  }

  return errors;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useRegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: RegisterFormField) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Replace with your real API call:
      // await registerUser(values.email, values.password);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch {
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setSuccess(false);
  };

  return {
    values,
    errors,
    loading,
    success,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
