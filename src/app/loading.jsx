export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>

        <p className="mt-4 text-lg font-semibold">
          Loading StudioSpace...
        </p>

        <p className="mt-2 text-sm text-base-content/60">
          Please wait while we prepare your creative space.
        </p>
      </div>
    </div>
  );
}