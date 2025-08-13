"use client";

import { getUserInfo } from "@/lib/utils";
import { useAuth } from "@campnetwork/origin/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import { useBalance } from "wagmi";
import Logo from "./Logo";
import { buttonPrimary } from "./styles";

type ConnectSectionProps = {
  wallet: any;
  authenticated: boolean;
  privyAuthenticated: boolean;
  openCampModal: () => void;
  login: () => void;
  disconnect: () => void;
};

export default function ConnectSection({
  wallet,
  privyAuthenticated,
  authenticated,
  openCampModal,
  login,
  disconnect,
}: ConnectSectionProps) {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: wallet?.address,
  });

  const hasEnoughCamp = balance ? balance.value > parseEther("0.01") : false;

  // const searchParams = useSearchParams();
  // const redirect = searchParams.get("redirect");

  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setRedirect(params.get("redirect"));
    }
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    if (authenticated && privyAuthenticated && wallet) {
      const user = (await getUserInfo(wallet.address))[0];

      if (user) {
        localStorage.setItem("IPVERSE_USER", JSON.stringify(user));
        router.push(redirect || "/explore");
        return;
      } else {
        router.push("/signup");
        router.refresh();
        return;
      }
    }
    try {
      if (wallet?.address) {
        if (authenticated) {
          if (!auth.viem) {
            toast.error("Wallet not connected to Origin", {
              description: "Please try disconnecting Origin and reconnecting.",
            });
            return;
          }
          if (!hasEnoughCamp && !isLoadingBalance) {
            toast.error("Insufficient balance to mint a generation.", {
              description:
                "You need at least 0.01 $CAMP in your wallet to mint.",
            });
            return;
          }
          if (
            wallet.address.toLowerCase() !==
            (auth.walletAddress as string)?.toLowerCase()
          ) {
            toast.error("Wallet address mismatch", {
              description:
                "Connect the same wallet to Origin. Try disconnecting and reconnecting.",
            });
            return;
          }
          const user = (await getUserInfo(wallet?.address))[0];

          if (user) {
            localStorage.setItem("IPVERSE_USER", JSON.stringify(user));
            router.push("/explore");
          } else {
            router.push("/signup");
            router.refresh();
          }
        } else {
          openCampModal();
        }
      } else {
        login();
      }
    } catch (error) {
      toast.error("An error occurred", { description: String(error) });
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{
        layout: { duration: 0.5, type: "spring" },
        scale: { type: "spring", stiffness: 200, damping: 20 },
        opacity: { duration: 0.3 },
      }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-md mx-auto bg-cardBg rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-2">
            {wallet?.address
              ? authenticated
                ? "Welcome back!"
                : "Sign In to IPVerse"
              : "Sign In to IPVerse"}
          </h2>

          {/* Subtext */}
          <p className="text-textSecondary mb-6">
            {wallet?.address
              ? authenticated
                ? "Ready to explore?"
                : "Connect your wallet to Origin Auth"
              : "Connect your Web3 wallet to continue."}
          </p>

          {/* Connect Button */}
          <button
            onClick={handleClick}
            className={`${buttonPrimary} hover:bg-buttonHover text-white w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold`}
          >
            {isLoading && (
              <span>
                <svg
                  className="animate-spin h-5 w-5 "
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
              </span>
            )}
            {wallet?.address ? (
              authenticated ? (
                <Image
                  alt="app logo"
                  src={"/globe.svg"}
                  width={5}
                  height={5}
                  className="h-8 w-8"
                />
              ) : (
                <Image
                  alt="camp logo"
                  src={"/camp.svg"}
                  width={5}
                  height={5}
                  className="h-8 w-8"
                />
              )
            ) : (
              <Image
                alt="wallet-icon"
                src={"/wallet-icon.svg"}
                width={5}
                height={5}
                className="h-8 w-8"
              />
            )}

            {wallet?.address
              ? authenticated
                ? "Enter the IPVerse"
                : "Origin Auth"
              : "Connect Wallet"}
          </button>

          {/* Disconnect Button */}
          {/* {wallet?.address && authenticated && (
            <button
              onClick={disconnect}
              className={`${buttonSecondary} mt-4 bg-transparent w-full border border-textSecondary text-textSecondary py-2 px-4 rounded-lg hover:bg-cardBg transition-colors`}
            >
              Disconnect Origin
            </button>
          )} */}

          {/* Balance Warning */}
          {!hasEnoughCamp && !isLoadingBalance && wallet?.address && (
            <div className="w-full text-center mt-4">
              <span className="text-sm text-textSecondary block">
                You need at least <strong>0.01 $CAMP</strong> in your wallet to
                mint.
              </span>
              <button
                onClick={() =>
                  window.open("https://faucet.campnetwork.xyz", "_blank")
                }
                className="mt-2 underline hover:text-textPrimary"
              >
                Get $CAMP
              </button>
            </div>
          )}

          {/* Terms */}
          <p className="text-xs text-textSecondary mt-6">
            By connecting your wallet, you agree to our{" "}
            <a className="underline hover:text-textPrimary" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline hover:text-textPrimary" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </motion.div>
  );
}
