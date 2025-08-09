"use client";
import React, { useEffect, useState } from "react";
import ContentPreview from "./ContentPreview";
import { toast } from "sonner";
import { typographyBody, typographyH1, typographyH2 } from "./styles";

interface MetadataAttribute {
  trait_type: string;
  value: string;
}

interface ContentViewProps {
  title?: string;
  creator?: string;
  date?: string;
  category?: string;
  fileUrl?: string;
  attributes?: MetadataAttribute[];
}

const ContentView = ({
  title = "Exclusive Content Title",
  creator = "Sophia Carter",
  date = "July 15, 2024",
  category = "Art",
  fileUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAVQU8-ogQB5kqco8s8UB83zu1ip4hxsKuEPzBdc3vbgyjzZ2mzOHe7j9vRuQSBXpvPuyC0zx-X2tnTW_NhH0fLweZOT5Rd81Uj9JrXYgDaViNPNiSazwJ1rLiPC6vVTyV0eM0k3f_ENyhD8uWumtMR5Z1UDrJXhXeS1NWk6fJDZKvuiU33DRro7vZUbJ0I9H_rK6f3xxXlxyefYmDkKpux68ai5CE7BZL4PWvRwyjrkW53OELUKPnczpxRi_H1LSHMcsLF1KHhFwI",
  // fileUrl = "https://raw.githubusercontent.com/koredeycode/IPVerse/refs/heads/main/README.md",
  attributes = [
    { trait_type: "Style", value: "Surreal" },
    { trait_type: "Palette", value: "Vibrant" },
    { trait_type: "Medium", value: "Digital" },
    { trait_type: "Edition", value: "1 of 1" },
  ],
}: ContentViewProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch file and convert to File object
  useEffect(() => {
    if (!fileUrl) {
      setIsLoading(false);
      setError("No file URL provided");
      return;
    }

    const fetchFile = async () => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }
        const blob = await response.blob();
        // Create a File object from the Blob
        const fileName = fileUrl.split("/").pop() || "content";
        const fileObject = new File([blob], fileName, { type: blob.type });
        setFile(fileObject);
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
        setIsLoading(false);
      }
    };
    fetchFile();
  }, [fileUrl]);

  return (
    <div className="w-full mb-16">
      <div className="mb-6 flex items-center gap-2 text-sm">
        <a className="text-textSecondary hover:text-textPrimary" href="#">
          {creator}
        </a>
        <span className="text-textSecondary">/</span>
        <span className="text-textPrimary">Content (Access)</span>
      </div>
      <div className="card mb-8 relative">
        <h1 className={`${typographyH2} mb-2 text-textPrimary`}>{title}</h1>
        <div className="relative mb-6 w-full">
          {isLoading ? (
            <div className="h-full w-full rounded-xl flex items-center justify-center bg-gray-200">
              <svg
                className="animate-spin h-8 w-8 text-textPrimary"
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
          ) : error ? (
            <div className="h-full w-full rounded-xl flex items-center justify-center bg-gray-200 text-textSecondary">
              {error}
            </div>
          ) : (
            <>{file && <ContentPreview file={file} />}</>
          )}
        </div>
        <div className="mb-6">
          <h3 className="typography_h2 border-b border-[rgba(255,255,255,0.1)] pb-3 text-textPrimary">
            Metadata
          </h3>
          <div className="grid grid-cols-1 gap-y-4 pt-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-textSecondary">Creator</p>
              <p className="text-base text-textPrimary">{creator}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-textSecondary">Date</p>
              <p className="text-base text-textPrimary">{date}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-textSecondary">Category</p>
              <p className="text-base text-textPrimary">{category}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="typography_h2 border-b border-[rgba(255,255,255,0.1)] pb-3 text-textPrimary">
            Attributes
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 pt-4">
            {attributes.map((attribute, index) => (
              <div
                key={index}
                className="rounded-lg border border-textSecondary p-3 text-center"
              >
                <p className="text-xs font-medium uppercase text-textSecondary">
                  {attribute.trait_type}
                </p>
                <p className="text-sm font-semibold text-textPrimary">
                  {attribute.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentView;
