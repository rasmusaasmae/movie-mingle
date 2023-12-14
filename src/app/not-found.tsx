import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center justify-center">
      <h1 className="text-9xl font-bold">Not Found</h1>
      <h2 className="text-5xl font-bold">Could not find requested resource</h2>
      <Link href="/">Return Home</Link>
    </main>
  );
}
