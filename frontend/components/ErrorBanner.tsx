export default function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mb-6 flex gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 cf-slide">
      <span className="text-base mt-0.5 shrink-0">⚠️</span>
      <div>
        <p className="font-semibold">Could not connect to the API</p>
        <p className="mt-0.5 text-red-600/75">
          Make sure the backend is running on{' '}
          <code className="rounded bg-red-100 px-1 font-mono text-xs">http://localhost:5000</code>
          <button onClick={onRetry} className="ml-3 underline hover:no-underline font-medium">
            Retry
          </button>
        </p>
      </div>
    </div>
  );
}