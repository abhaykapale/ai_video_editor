import { useState } from "react";
import { EyeIcon } from "../../../icons";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  showToggle?: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function InputField({
  label,
  id,
  type: initialType = "text",
  value,
  onChange,
  error,
  placeholder,
  showToggle = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = showToggle
    ? showPassword ? "text" : "password"
    : initialType;

  const inputClassName = [
    "w-full h-10 px-3.5 text-sm bg-white rounded-lg border",
    "transition-all duration-150 outline-none placeholder:text-gray-300",
    showToggle ? "input-has-toggle" : "input-no-toggle",
    error
      ? "border-red-300 ring-2 ring-red-100 text-red-900"
      : focused
      ? "border-indigo-400 ring-2 ring-indigo-50 text-gray-900"
      : "border-gray-200 hover:border-gray-300 text-gray-900",
  ].join(" ");

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={inputClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            <EyeIcon open={showPassword} />
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-500 mt-1 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
