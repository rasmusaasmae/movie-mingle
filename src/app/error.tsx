"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-bold">Oh no!</h1>
      <h2 className="text-5xl font-bold">Something went wrong</h2>
    </main>
  );
}
