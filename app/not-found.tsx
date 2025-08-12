import Logo from "@/components/Logo";
import Link from "next/link";

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen bg-ipv-background flex flex-col items-center justify-center">
      <p className="text-xl text-textPrimary mb-4">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link href="/" className="bg-ipv-primary text-white px-6 py-2 rounded">
        Go to Home
      </Link>
    </div>
  );
}
