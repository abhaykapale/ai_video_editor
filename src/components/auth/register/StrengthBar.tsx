// ─── Constants ─────────────────────────────────────────────────────────────────

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"] as const;

const SEGMENT_COLORS = [
  "",
  "bg-red-400",
  "bg-amber-400",
  "bg-blue-400",
  "bg-emerald-400",
] as const;

const TEXT_COLORS = [
  "",
  "text-red-500",
  "text-amber-500",
  "text-blue-500",
  "text-emerald-600",
] as const;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

// ─── Component ─────────────────────────────────────────────────────────────────

interface StrengthBarProps {
  password: string;
}

export function StrengthBar({ password }: StrengthBarProps) {
  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5" aria-live="polite" aria-label={`Password strength: ${STRENGTH_LABELS[strength]}`}>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={[
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= strength ? SEGMENT_COLORS[strength] : "bg-gray-100",
            ].join(" ")}
          />
        ))}
      </div>
      <p className={`text-[11px] font-medium ${TEXT_COLORS[strength]}`}>
        {STRENGTH_LABELS[strength]}
      </p>
    </div>
  );
}
