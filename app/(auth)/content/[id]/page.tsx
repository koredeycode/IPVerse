"use client";

import ContentView from "@/components/ContentView";
import NoContentView from "@/components/NoContentView";
import { useAuth } from "@campnetwork/origin/react";
import { useActiveWallet } from "@privy-io/react-auth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isAddress } from "viem";

interface MetadataAttribute {
  trait_type: string;
  value: string;
}

interface ContentData {
  name: string;
  creator: string;
  date: string;
  type: string;
  fileUrl: string;
  attributes: MetadataAttribute[];
}

// Mock API function to fetch data (replace with your actual API or blockchain logic)
const getTokenId = async (id: string): Promise<bigint> => {
  try {
    const APIResponse = await fetch(`/api/contents/${id}/tokenId`);
    if (!APIResponse.ok) {
      throw new Error("Failed to fetch content by ID");
    }
    const APIData = await APIResponse.json();
    const tokenId = APIData.tokenId;
    if (!tokenId || isNaN(Number(tokenId))) {
      throw new Error("Invalid token ID from API");
    }
    return BigInt(tokenId);
  } catch (error) {
    throw error instanceof Error ? error : new Error("An error occurred");
  }
};

const getFileUrl = async (id: string): Promise<string> => {
  try {
    const APIResponse = await fetch(`/api/contents/${id}/fileUrl`);
    if (!APIResponse.ok) {
      throw new Error("Failed to fetch content by ID");
    }
    const APIData = await APIResponse.json();
    const fileUrl = APIData.fileUrl;
    if (!fileUrl) {
      throw new Error("Can't get fileUrl");
    }
    return fileUrl;
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
        const hasAccess = (await origin?.hasAccess(address, tokenId)) ?? false;
        console.log("hasAccess:", hasAccess);
        if (hasAccess || owner === address) {
          setAccess(true);
          const tokenUri = await origin?.tokenURI(tokenId);
          const fileUrl = await getFileUrl(id);

          const response = await fetch(tokenUri);
          const data = await response.json();

          setContentData({ ...data, fileUrl });
        } else {
          setAccess(false);
          setContentData({
            name: "Dummy",
            creator: "dummy",
            date: "today",
            type: "image",
            fileUrl:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAVQU8-ogQB5kqco8s8UB83zu1ip4hxsKuEPzBdc3vbgyjzZ2mzOHe7j9vRuQSBXpvPuyC0zx-X2tnTW_NhH0fLweZOT5Rd81Uj9JrXYgDaViNPNiSazwJ1rLiPC6vVTyV0eM0k3f_ENyhD8uWumtMR5Z1UDrJXhXeS1NWk6fJDZKvuiU33DRro7vZUbJ0I9H_rK6f3xxXlxyefYmDkKpux68ai5CE7BZL4PWvRwyjrkW53OELUKPnczpxRi_H1LSHMcsLF1KHhFwI",
            attributes: [],
          });
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
      type={contentData.type}
      fileUrl={contentData.fileUrl}
      attributes={contentData.attributes}
    />
  ) : (
    <NoContentView
      title={contentData.name}
      creator={contentData.creator || "IpVerse"}
      date={contentData.date || "Today"}
      type={contentData.type}
      fileUrl={contentData.fileUrl}
      tokenId={tokenId}
      // subscriptionPrice={contentData.subscriptionPrice}
      // subscriptionDetails={contentData.subscriptionDetails}
    />
  );
};

export default ContentPage;
