import { CheckIcon } from "../../../icons";

// ─── SuccessState ──────────────────────────────────────────────────────────────

interface SuccessStateProps {
  onReset: () => void;
}

export function SuccessState({ onReset }: SuccessStateProps) {
  return (
    <div className="text-center py-4">
      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4 check-pop text-emerald-600">
        <CheckIcon />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Account created
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Welcome aboard. Check your inbox to verify your email.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
      >
        Back to register →
      </button>
    </div>
  );
}
