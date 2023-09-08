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
      <h1 className="font-bold text-9xl">Oh no!</h1>
      <h2 className="font-bold text-5xl">Something went wrong</h2>
      <p className="pt-4">{error.message}</p>
    </main>
  );
}
