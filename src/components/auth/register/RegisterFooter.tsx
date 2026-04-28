// ─── RegisterFooter ────────────────────────────────────────────────────────────

export function RegisterFooter() {
  return (
    <p className="text-center text-sm text-gray-500 mt-5 fade-up fade-up-delay-2">
      Already have an account?{" "}
      <a
        href="/login"
        className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        Sign in
      </a>
    </p>
  );
}
