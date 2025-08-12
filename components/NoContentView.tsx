"use client";
import { fromTotalSeconds, getTotalSeconds } from "@/lib/content";
import { getLoggedInUserTwitter } from "@/lib/utils";
import { useAuth } from "@campnetwork/origin/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";
import {
  buttonPrimary,
  typographyBody,
  typographyH1,
  typographyH2,
} from "./styles";

interface MetadataAttribute {
  trait_type: string;
  value: string;
}

interface NoContentViewProps {
  title?: string;
  creator?: string;
  date?: string;
  type?: string;
  fileUrl?: string;
  subscriptionPrice?: string;
  // subscriptionDetails?: string;
  tokenId?: bigint;
  contentId: string;
}
type LicenseTerms = {
  price: bigint;
  duration: number;
  royaltyBps: number;
  paymentToken: Address;
};
const NoContentView: React.FC<NoContentViewProps> = ({
  title,
  creator,
  date,
  type,
  fileUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAVQU8-ogQB5kqco8s8UB83zu1ip4hxsKuEPzBdc3vbgyjzZ2mzOHe7j9vRuQSBXpvPuyC0zx-X2tnTW_NhH0fLweZOT5Rd81Uj9JrXYgDaViNPNiSazwJ1rLiPC6vVTyV0eM0k3f_ENyhD8uWumtMR5Z1UDrJXhXeS1NWk6fJDZKvuiU33DRro7vZUbJ0I9H_rK6f3xxXlxyefYmDkKpux68ai5CE7BZL4PWvRwyjrkW53OELUKPnczpxRi_H1LSHMcsLF1KHhFwI",
  // subscriptionPrice = "$5/month",
  // subscriptionDetails = "Billed monthly. Cancel anytime.",
  tokenId,
  contentId,
}) => {
  const [price, setPrice] = useState(0);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isNowSubscribed, setIsNowSubscribed] = useState(false);
  const [duration, setDuration] = useState<{
    duration: number;
    unit: string;
  }>();
  const auth = useAuth();
  const router = useRouter();

  const { origin } = auth;
  useEffect(() => {
    const getLicense = async () => {
      if (!tokenId) {
        return;
      }
      const data = await origin?.getTerms(tokenId);
      console.log(data);
      setPrice(Number(data.price) / 10 ** 18);
      setDuration(fromTotalSeconds(data.duration));
    };
    getLicense();
  }, [tokenId]);

  async function handleSubscription() {
    try {
      setIsSubscribing(true);
      if (tokenId) await auth.origin?.buyAccessSmart(tokenId, 1);

      // send update to the appwrite database
      const APIResponse = await fetch(`/api/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriber: getLoggedInUserTwitter() || "@ipverse",
          contentId,
          price,
          duration: getTotalSeconds(
            duration?.duration ?? 0,
            duration?.unit || ""
          ),
          contentTitle: title ?? "An Ipverse Content",
        }),
      });

      toast.success("Subscribed successfully");
      setIsNowSubscribed(true);
      // router.refresh();
    } catch (error) {
      console.error("Subscription failed:", error);

      // Provide more specific error messages
      let errorMessage = "Subscription failed. Please try again later.";
      let errorDescription =
        error instanceof Error ? error.message : "An error occurred";

      if (
        errorDescription.includes("signature") ||
        errorDescription.includes("Failed to get signature")
      ) {
        errorMessage = "Transaction signature failed.";
        errorDescription =
          "Please check your wallet connection and approve the transaction when prompted.";
      } else if (errorDescription.includes("network")) {
        errorMessage = "Network error. Please check your connection.";
        errorDescription = "Make sure you're connected to the correct network.";
      } else if (errorDescription.includes("gas")) {
        errorMessage = "Insufficient gas fees.";
        errorDescription =
          "Please ensure you have enough gas for the transaction.";
      } else if (
        errorDescription.includes("user rejected") ||
        errorDescription.includes("User rejected")
      ) {
        errorMessage = "Transaction was rejected.";
        errorDescription =
          "You declined the transaction. Please try again and approve when prompted.";
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000,
      });
      toast.error(errorMessage, {
        description:
          "You can click the origin button in the nav bar to check if your wallet is connected",
        duration: 5000,
      });
    } finally {
      setIsSubscribing(false);
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 flex items-center gap-2 text-sm">
        <a className="text-textSecondary hover:text-textPrimary" href="#">
          @{creator}
        </a>
        <span className="text-textSecondary">/</span>
        <span className="text-textPrimary">Content (No Access)</span>
      </div>
      <div className="card relative overflow-hidden">
        <div className="blur-md">
          <h1 className={`${typographyH1} mb-2 text-textPrimary`}>{title}</h1>
          <div className="relative mb-6 aspect-video w-full">
            <div
              className="h-full w-full rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${fileUrl})` }}
            ></div>
          </div>
          <div className="mb-6">
            <h3
              className={`${typographyH2} border-b border-[rgba(255,255,255,0.1)] pb-3 text-textPrimary`}
            >
              Metadata
            </h3>
            <div className="grid grid-cols-1 gap-y-4 pt-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-textSecondary">
                  Creator
                </p>
                <p className="text-base text-textPrimary">{creator}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-textSecondary">Date</p>
                <p className="text-base text-textPrimary">{date}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-textSecondary">Type</p>
                <p className="text-base text-textPrimary">{type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-cardBg/80 p-6 backdrop-blur-sm">
          <div className="text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-ipv-primary"
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208Z"></path>
            </svg>
            <h2 className={`${typographyH2} text-textPrimary`}>
              Unlock Exclusive Content
            </h2>
            <p className={`${typographyBody} text-textSecondary mb-6`}>
              Subscribe to get access to this exclusive content.
            </p>
            <div className="mb-4 text-center">
              <p className="text-lg font-bold text-textPrimary">
                At {price} CAMP for {duration?.duration} {duration?.unit}
              </p>
            </div>
            <button
              onClick={handleSubscription}
              className={`${buttonPrimary} flex gap-2 justify-center w-full max-w-xs`}
              disabled={isNowSubscribed}
            >
              {isSubscribing && (
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
              <span>{isSubscribing ? "Subscribing" : "Subscribe Now"}</span>
            </button>

            {isNowSubscribed && (
              <div className="mt-4">
                <p className={`${typographyBody} text-textSecondary mb-4`}>
                  Subscription successful. Refresh to view content.
                </p>
                <button
                  className={`${buttonPrimary} w-full`}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Refresh
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoContentView;
