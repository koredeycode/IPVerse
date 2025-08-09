"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ContentView from "@/components/ContentView";
import { toast } from "sonner";
import NoContentView from "@/components/NoContentView";

interface MetadataAttribute {
  trait_type: string;
  value: string;
}

interface ContentData {
  title: string;
  creator: string;
  date: string;
  category: string;
  fileUrl: string;
  attributes: MetadataAttribute[];
}

// Mock API function to fetch data (replace with your actual API or blockchain logic)
const fetchContentData = async (
  tokenUri?: string,
  id?: string
): Promise<ContentData> => {
  try {
    if (tokenUri) {
      // Example: Fetch JSON metadata from tokenUri (e.g., IPFS or HTTP)
      const response = await fetch(tokenUri);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch metadata from tokenUri");
      // }
      // const metadata = await response.json();

      // Map metadata to ContentData (adjust based on your metadata structure)
      // return {
      //   title: metadata.name || "Exclusive Content Title",
      //   creator: metadata.creator || "korefomo",
      //   date: metadata.date || new Date().toISOString().split("T")[0],
      //   category: metadata.category || "Art",
      //   fileUrl:
      //     metadata.image ||
      //     metadata.fileUrl ||
      //     "https://lh3.googleusercontent.com/aida-public/AB6AXuAVQU8-ogQB5kqco8s8UB83zu1ip4hxsKuEPzBdc3vbgyjzZ2mzOHe7j9vRuQSBXpvPuyC0zx-X2tnTW_NhH0fLweZOT5Rd81Uj9JrXYgDaViNPNiSazwJ1rLiPC6vVTyV0eM0k3f_ENyhD8uWumtMR5Z1UDrJXhXeS1NWk6fJDZKvuiU33DRro7vZUbJ0I9H_rK6f3xxXlxyefYmDkKpux68ai5CE7BZL4PWvRwyjrkW53OELUKPnczpxRi_H1LSHMcsLF1KHhFwI",
      //   attributes: metadata.attributes || [],
      // };
      return {
        title: "Exclusive Content Title",
        creator: "korefomo",
        date: new Date().toISOString().split("T")[0],
        category: "Art",
        fileUrl:
          "https://raw.githubusercontent.com/koredeycode/IPVerse/refs/heads/main/README.md",
        attributes: [
          { trait_type: "Style", value: "Surreal" },
          { trait_type: "Palette", value: "Vibrant" },
          { trait_type: "Medium", value: "Digital" },
          { trait_type: "Edition", value: "1 of 1" },
        ],
      };
    } else if (id) {
      // Example: Fetch data from an API using id
      // Replace with your actual API endpoint
      const response = await fetch(`/api/content?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch content by ID");
      }
      const data = await response.json();
      return {
        title: data.title || "Exclusive Content Title",
        creator: data.creator || "Unknown Creator",
        date: data.date || new Date().toISOString().split("T")[0],
        category: data.category || "Art",
        fileUrl: data.fileUrl || "",
        attributes: data.attributes || [],
      };
    } else {
      throw new Error("No tokenUri or id provided");
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error("An error occurred");
  }
};

const ContentPage = () => {
  const searchParams = useSearchParams();
  const tokenUri = searchParams.get("tokenUri");
  const id = searchParams.get("id");

  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const hasAccess = tokenUri == "1";

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchContentData(
          tokenUri || undefined,
          id || undefined
        );
        setContentData(data);
        setIsLoading(false);
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
      }
    };

    loadContent();
  }, [tokenUri, id]);

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

  if (error || (!tokenUri && !id)) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--text-secondary)]">
        {error || "No content ID or token URI provided"}
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

  return hasAccess ? (
    <ContentView
      title={contentData.title}
      creator={contentData.creator}
      date={contentData.date}
      category={contentData.category}
      fileUrl={contentData.fileUrl}
      attributes={contentData.attributes}
    />
  ) : (
    <NoContentView
      title={contentData.title}
      creator={contentData.creator}
      date={contentData.date}
      category={contentData.category}
      fileUrl={contentData.fileUrl}
      // subscriptionPrice={contentData.subscriptionPrice}
      // subscriptionDetails={contentData.subscriptionDetails}
    />
  );
};

export default ContentPage;
