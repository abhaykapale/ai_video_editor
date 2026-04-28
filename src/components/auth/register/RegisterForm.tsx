import { Spinner } from "../../../icons/Spinner";
import type { RegisterFormValues, RegisterFormErrors, RegisterFormField } from "../../../types/auth";
import { InputField } from "./InputField";
import { StrengthBar } from "./StrengthBar";
import { OAuthSection } from "./OAuthSection";
import { RegisterHeader } from "./RegisterHeader";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface RegisterFormProps {
  values: RegisterFormValues;
  errors: RegisterFormErrors;
  loading: boolean;
  onChange: (field: RegisterFormField) => (value: string) => void;
  onSubmit: () => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function RegisterForm({
  values,
  errors,
  loading,
  onChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <>
      <RegisterHeader />

      {/* Fields */}
      <div className="space-y-4">
        <InputField
          label="Email address"
          id="email"
          type="email"
          value={values.email}
          onChange={onChange("email")}
          error={errors.email}
          placeholder="enter your email address"
        />

        <div>
          <InputField
            label="Password"
            id="password"
            type="password"
            showToggle
            value={values.password}
            onChange={onChange("password")}
            error={errors.password}
            placeholder="Min. 8 characters"
          />
          <StrengthBar password={values.password} />
        </div>

        <InputField
          label="Confirm password"
          id="confirm"
          type="password"
          showToggle
          value={values.confirm}
          onChange={onChange("confirm")}
          error={errors.confirm}
          placeholder="Repeat your password"
        />
      </div>

      {/* Terms */}
      {/* <p className="text-[11.5px] text-gray-400 mt-5 leading-relaxed">
        By creating an account, you agree to our{" "}
        <a
          href="/terms"
          className="text-indigo-500 hover:text-indigo-600 underline underline-offset-2 transition-colors"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="text-indigo-500 hover:text-indigo-600 underline underline-offset-2 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </p> */}

      {/* Submit */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className={[
          "mt-5 w-full h-10 rounded-lg text-sm font-semibold text-white",
          "transition-all duration-150 flex items-center justify-center gap-2",
          loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-sm shadow-indigo-200 hover:shadow-indigo-300",
        ].join(" ")}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Spinner />
            <span>Creating account…</span>
          </>
        ) : (
          "Create account"
        )}
      </button>

      <OAuthSection />
    </>
  );
}
