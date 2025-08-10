"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ContentView from "@/components/ContentView";
import { toast } from "sonner";
import NoContentView from "@/components/NoContentView";
import { useAuth } from "@campnetwork/origin/react";
import { useActiveWallet, usePrivy } from "@privy-io/react-auth";
import type { Address } from "viem/accounts";
import { isAddress } from "viem";

interface MetadataAttribute {
  trait_type: string;
  value: string;
}

interface ContentData {
  name: string;
  creator: string;
  date: string;
  category: string;
  file: string;
  attributes: MetadataAttribute[];
}

// Mock API function to fetch data (replace with your actual API or blockchain logic)
const getTokenId = async (id: string): Promise<bigint> => {
  try {
    const APIResponse = await fetch(`/api/contents/${id}`);
    if (!APIResponse.ok) {
      throw new Error("Failed to fetch content by ID");
    }
    const APIData = await APIResponse.json();
    const tokenId = APIData.tokenId;
    return BigInt(tokenId);
  } catch (error) {
    throw error instanceof Error ? error : new Error("An error occurred");
  }
};

const ContentPage = () => {
  // const searchParams = useSearchParams();
  const params = useParams();
  const id = params.id?.toString() || "";
  // const tokenUri = searchParams.get("tokenUri");
  // const id = searchParams.get("id");
  const auth = useAuth();
  const { origin } = auth;
  const { wallet } = useActiveWallet();
  const address = wallet?.address as `0x${string}`;

  console.log("the address", address);
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [access, setAccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<bigint>();

  useEffect(() => {
    const loadContent = async () => {
      if (!address || !isAddress(address)) {
        console.warn("Wallet address not ready yet:", address);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const tokenId = await getTokenId(id);
        console.log("tokenId:", tokenId);
        setTokenId(tokenId);
        const owner = await origin?.ownerOf(tokenId);
        console.log("owner", owner);
        const hasAccess = await origin?.hasAccess(address, tokenId);
        console.log("hasAccess:", hasAccess);
        if (hasAccess || owner === address) {
          setAccess(false);
          const tokenUri = await origin?.tokenURI(tokenId);

          const response = await fetch(tokenUri);
          const data = await response.json();

          setContentData(data);
        } else {
          setAccess(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        let message = "Unknown error";
        if (err instanceof Error) {
          message = err.message;
        }
        toast.error("An error occured", {
          description: message,
          duration: 5000,
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [id, address, origin]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-[var(--text-primary)]"
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

  if (error || !id) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--text-secondary)]">
        {error || "No content ID  provided"}
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--text-secondary)]">
        No content found
      </div>
    );
  }

  return access ? (
    <ContentView
      title={contentData.name}
      creator={contentData.creator}
      date={contentData.date}
      category={contentData.category}
      fileUrl={contentData.file}
      attributes={contentData.attributes}
    />
  ) : (
    <NoContentView
      title={contentData.name}
      creator={contentData.creator}
      date={contentData.date}
      category={contentData.category}
      fileUrl={contentData.file}
      tokenId={tokenId}
      // subscriptionPrice={contentData.subscriptionPrice}
      // subscriptionDetails={contentData.subscriptionDetails}
    />
  );
};

export default ContentPage;
