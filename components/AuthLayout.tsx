"use client";

import Navbar from "@/components/Navbar";
import { useAuth, useAuthState, useConnect } from "@campnetwork/origin/react";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { authenticated, loading } = useAuthState();
  const { connect } = useConnect();

  const auth = useAuth();

  const { authenticated: privyAuthenticated, ready } = usePrivy();
  const router = useRouter();

  // Log auth state for debugging
  console.log({ loading, authenticated, privyAuthenticated, ready });

  // Show loading state
  if (loading || !ready) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-ipv-background">
        <svg
          className="animate-spin h-8 w-8 text-ipv-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  // Show not logged in state
  if (!authenticated && !privyAuthenticated) {
    return (
      <div className="min-h-screen bg-ipv-background flex flex-col items-center justify-center">
        <p className="text-xl text-textPrimary mb-4">You are not logged in</p>
        <Link
          href="/signin"
          className="bg-ipv-primary text-white px-6 py-2 rounded"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  if (authenticated) {
  }

  // Authenticated state: render sidebar, navbar, and children
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </Suspense>
      </div>
    </div>
  );
}
