
import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner({
  message = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-[70vh]" : "min-h-[250px] py-12"
      }`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        size={42}
        strokeWidth={2}
        className="animate-spin text-[#C66B45]"
      />

      <p className="text-sm font-medium text-[#777970]">
        {message}
      </p>

      <span className="sr-only">Loading content, please wait.</span>
    </div>
  );
}
