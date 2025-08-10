"use client";
import { fromTotalSeconds } from "@/lib/content";
import { useAuth } from "@campnetwork/origin/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { buttonPrimary } from "./styles";

interface MetadataAttribute {
  trait_type: string;
  value: string;
}

interface NoContentViewProps {
  title?: string;
  creator?: string;
  date?: string;
  category?: string;
  fileUrl?: string;
  subscriptionPrice?: string;
  subscriptionDetails?: string;
  tokenId?: bigint;
}
type LicenseTerms = {
  price: bigint;
  duration: number;
  royaltyBps: number;
  paymentToken: Address;
};
const NoContentView: React.FC<NoContentViewProps> = ({
  title = "Exclusive Content Title",
  creator = "Sophia Carter",
  date = "July 15, 2024",
  category = "Art",
  fileUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAVQU8-ogQB5kqco8s8UB83zu1ip4hxsKuEPzBdc3vbgyjzZ2mzOHe7j9vRuQSBXpvPuyC0zx-X2tnTW_NhH0fLweZOT5Rd81Uj9JrXYgDaViNPNiSazwJ1rLiPC6vVTyV0eM0k3f_ENyhD8uWumtMR5Z1UDrJXhXeS1NWk6fJDZKvuiU33DRro7vZUbJ0I9H_rK6f3xxXlxyefYmDkKpux68ai5CE7BZL4PWvRwyjrkW53OELUKPnczpxRi_H1LSHMcsLF1KHhFwI",
  // subscriptionPrice = "$5/month",
  // subscriptionDetails = "Billed monthly. Cancel anytime.",
  tokenId,
}) => {
  const [price, setPrice] = useState(0);
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
    if (tokenId) await auth.origin?.buyAccessSmart(tokenId, 1);
    //send update to the appwrite database
    router.refresh();
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
          <h1 className="typography_h1 mb-2 text-textPrimary">{title}</h1>
          <div className="relative mb-6 aspect-video w-full">
            <div
              className="h-full w-full rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${fileUrl})` }}
            ></div>
          </div>
          <div className="mb-6">
            <h3 className="typography_h2 border-b border-[rgba(255,255,255,0.1)] pb-3 text-textPrimary">
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
                <p className="text-sm font-medium text-textSecondary">
                  Category
                </p>
                <p className="text-base text-textPrimary">{category}</p>
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
            <h2 className="typography_h2 text-textPrimary">
              Unlock Exclusive Content
            </h2>
            <p className="typography_body text-textSecondary mb-6">
              Subscribe to {creator} to get access to this and other exclusive
              content.
            </p>
            <div className="mb-4 text-left">
              <p className="text-lg font-bold text-textPrimary">
                Subscription: {price} CAMP for {duration?.duration}{" "}
                {duration?.unit}
              </p>
              <p className="text-sm text-textSecondary">hi</p>
            </div>
            <button
              onClick={handleSubscription}
              className={`${buttonPrimary} w-full max-w-xs`}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoContentView;
