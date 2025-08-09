"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useAuthState } from "@campnetwork/origin/react";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { authenticated, loading } = useAuthState();
  const { authenticated: privyAuthenticated, ready } = usePrivy();
  const router = useRouter();

  // Log auth state for debugging
  console.log({ loading, authenticated, privyAuthenticated, ready });

  // // Redirect to /signin if not authenticated, after loading/ready states
  // useEffect(() => {
  //   if (!loading && ready && !authenticated && !privyAuthenticated) {
  //     router.push("/signin");
  //   }
  // }, [loading, authenticated, ready, privyAuthenticated, router]);

  // Show loading state
  if (loading || !ready) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Show not logged in state
  if (!authenticated && !privyAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">You are not logged in</p>
        <Link
          href="/signin"
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  // Authenticated state: render sidebar, navbar, and children
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
