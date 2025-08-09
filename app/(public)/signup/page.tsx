"use client";
import SignUpForm from "@/components/SignUpForm";
import React from "react";
import { useActiveWallet } from "@privy-io/react-auth";

const SignUpPage = () => {
  const { wallet } = useActiveWallet();

  return (
    <main className="flex-grow flex items-center justify-center">
      <SignUpForm wallet={wallet?.address as `0x${string}`} />
    </main>
  );
};

export default SignUpPage;
