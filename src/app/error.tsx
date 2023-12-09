"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <h1 className="text-9xl font-bold">Oh no!</h1>
      <h2 className="text-5xl font-bold">Something went wrong</h2>
      <p className="pt-4">{error.message}</p>
    </main>
  );
}
