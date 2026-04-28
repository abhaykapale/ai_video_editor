"use client";

import { useEffect, useState } from "react";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import { LogoMark } from "./LogoMark";
import { RegisterForm } from "./RegisterForm";
import { RegisterFooter } from "./RegisterFooter";
import { SuccessState } from "./SuccessState";

// ─── RegisterPage ──────────────────────────────────────────────────────────────

export function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const { values, errors, loading, success, handleChange, handleSubmit, handleReset } =
    useRegisterForm();

  // Trigger entrance animation after first paint
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="register-page register-bg min-h-screen flex items-center justify-center px-4 py-12"
      aria-label="Register"
    >
      <div
        className={[
          "w-full max-w-105 transition-all duration-500",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        ].join(" ")}
      >
        <LogoMark />

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/80 px-8 py-9 fade-up fade-up-delay-1">
          {success ? (
            <SuccessState onReset={handleReset} />
          ) : (
            <RegisterForm
              values={values}
              errors={errors}
              loading={loading}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {!success && <RegisterFooter />}
      </div>
    </main>
  );
}
