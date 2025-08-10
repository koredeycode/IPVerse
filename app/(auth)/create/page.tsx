"use client";

import ContentPreview from "@/components/ContentPreview";
import FileCard from "@/components/FileCard";
import {
  buttonPrimary,
  buttonSecondary,
  typographyH1,
  typographyH2,
} from "@/components/styles";
import { getFileIcon, getFileType, getTotalSeconds } from "@/lib/content";
import { uploadSchema } from "@/schemas/contentSchemas";
import { useAuth } from "@campnetwork/origin/react";
import { useActiveWallet } from "@privy-io/react-auth";
import { useState } from "react";
import { toast } from "sonner";
import type { Address } from "viem/accounts";

type MetadataAttribute = {
  trait_type: string;
  value: string;
};

type LicenseTerms = {
  price: bigint;
  duration: number;
  royaltyBps: number;
  paymentToken: Address;
};

export default function Create() {
  const auth = useAuth();

  const { origin } = auth;
  const { wallet } = useActiveWallet();

  const [file, setFile] = useState<File | null>(null);
  const [mintFile, setMintFile] = useState<File | null>(null);

  const [stepOneComplete, setStepOneComplete] = useState(false);
  const [stepTwoComplete, setStepTwoComplete] = useState(false);

  const [showFileCard, setShowFileCard] = useState(false);
  const [loadingState, setLoadingState] = useState<string>("none");

  const [contentId, setContentId] = useState<any>();

  const [mintData, setMintData] = useState({
    title: "",
    fileUrl: "",
    imageUrl: "",
    description: "",
    attributes: [
      { trait_type: "Example trait", value: "Example value" },
    ] as MetadataAttribute[],
    price: "",
    duration: "",
    durationUnit: "Weeks",
  });

  async function handleUploadFile() {
    if (!file) {
      toast.error("No file uploaded");
      return;
    }
    const result = uploadSchema.safeParse({ file });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    const ipfsFile = new File([file], file.name, {
      type: file.type,
    });

    let fileUrl = "";
    try {
      setLoadingState("fileUploading");
      const formData = new FormData();
      formData.append("file", ipfsFile);

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      fileUrl = result.IpfsHash
        ? `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
        : ``;

      if (!fileUrl) {
        throw new Error("Failed to get IPFS URL after upload");
      }

      toast.success("File uploaded to IPFS successfully!", {
        description: `IPFS URL: ${fileUrl}`,
      });

      //send data to ipverse
      const APIResponse = await fetch("/api/contents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileUrl,
          creator: wallet?.address,
          type: getFileType(file.name),
        }),
      });

      const { $id: id } = await APIResponse.json();

      setContentId(id);

      toast.success("Uploaded to ipVerse successfully");
    } catch (error) {
      console.error("IPFS upload error:", error);
      toast.error("Failed to upload file to IPFS", {
        description:
          "There was an error uploading your file. Please try again.",
        duration: 5000,
      });
      return;
    } finally {
      setLoadingState("none");
    }

    // Auto-fill URL (in a real app this comes from your upload API)
    setMintData((prev) => ({
      ...prev,
      fileUrl,
    }));
    setStepOneComplete(true);
  }
  async function handleUploadImage() {
    if (!stepOneComplete) {
      toast.error("Upload file first");
      return;
    }
    if (!mintFile) {
      toast.error("No file uploaded");
      return;
    }

    console.log(mintFile);
    // const result = uploadSchema.safeParse({ mintFile });
    // if (!result.success) {
    //   console.log("schemoo");
    //   toast.error(result.error.errors[0].message);
    //   return;
    // }

    const ipfsFile = new File([mintFile], mintFile.name, {
      type: mintFile.type,
    });

    let imageUrl = "";
    try {
      setLoadingState("imageUploading");
      const formData = new FormData();
      formData.append("file", ipfsFile);

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      imageUrl = result.IpfsHash
        ? `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
        : ``;

      if (!imageUrl) {
        throw new Error("Failed to get IPFS URL after upload");
      }
      console.log(imageUrl);

      toast.success("File uploaded to IPFS successfully!", {
        description: `IPFS URL: ${imageUrl}`,
      });

      //update data to ipverse
      const APIResponse = await fetch(`/api/contents/${contentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
        }),
      });

      toast.success("Ipverse content updated successfully");
    } catch (error) {
      console.error("IPFS upload error:", error);
      toast.error("Failed to upload file to IPFS", {
        description:
          "There was an error uploading your file. Please try again.",
        duration: 5000,
      });
      return;
    } finally {
      setLoadingState("none");
    }

    // Auto-fill URL (in a real app this comes from your upload API)
    setMintData((prev) => ({
      ...prev,
      imageUrl,
    }));
    setStepTwoComplete(true);
  }

  async function handleMintSubmit() {
    console.log("let's mint");
    // const result = mintSchema.safeParse({
    //   ...mintData,
    //   price: Number(mintData.price),
    //   duration: Number(mintData.duration),
    // });

    // if (!result.success) {
    //   toast.error(result.error.errors[0].message);
    //   return;
    // }

    if (!mintFile) {
      toast.error("No mintable file detected");
      return;
    }

    if (!origin) {
      toast.error("user not connected to origin");
      return;
    }

    const license = {
      price: BigInt(Number(mintData.price) * 10 ** 18),
      duration: getTotalSeconds(
        Number(mintData.duration),
        mintData.durationUnit
      ),
      royaltyBps: 500, // 5%
      paymentToken: "0x0000000000000000000000000000000000000000" as Address,
    } as LicenseTerms;

    const metadata = {
      title: "An IPVerse IP",
      name: mintData.title,
      description: mintData.description,
      image: mintData.imageUrl,
      file: mintData.fileUrl,
      attributes: mintData.attributes,
      // date
      //creator
    };

    try {
      setLoadingState("minting");
      console.log(mintFile, metadata, license);
      const tokenId = await origin.mintFile(mintFile, metadata, license);

      // 62969147512708210739597738314450365440119337125482253728267133656897450032217

      toast.success(`Minting successful! Your IP NFT is now live.`, {
        duration: 5000,
      });
      //update data to ipverse
      const APIResponse = await fetch(`/api/contents/${contentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId,
        }),
      });
      toast.success("Ipverse content updated successfully");
    } catch (error) {
      console.error("Minting failed:", error);

      // Provide more specific error messages
      let errorMessage = "Minting failed. Please try again later.";
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
    } finally {
      setLoadingState("none");
    }
  }

  function addMetadataField() {
    setMintData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: "", value: "" }],
    }));
  }

  function updateMetadataField(
    index: number,
    key: keyof MetadataAttribute,
    value: string
  ) {
    setMintData((prev) => {
      const newMetadata = [...prev.attributes];
      newMetadata[index][key] = value;
      return { ...prev, metadata: newMetadata };
    });
  }

  function removeMetadataField(index: number) {
    setMintData((prev) => {
      const newMetadata = prev.attributes.filter((_, i) => i !== index);
      return { ...prev, metadata: newMetadata };
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className={`${typographyH1} text-center md:text-left`}>
        Mint your IP
      </h1>

      {/* Step 1: Upload */}
      <div className="card">
        <h2 className={`${typographyH2} border-b border-b-gray-700 pb-4 mb-6"`}>
          1. Upload File
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label
              className="block text-sm font-medium text-textPrimary mb-2"
              htmlFor="upload-content"
            >
              Upload Content
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card-background border-texttext-textSecondary hover:bg-background-color transition"
                htmlFor="dropzone-file"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M12 16v-4m0 0l-2-2m2 2l2-2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-textSecondary">
                    <span className="font-semibold">Click to upload</span>
                    {/* or drag and drop */}
                  </p>
                  <p className="text-xs text-textSecondary">
                    Supported: JPG, PNG, GIF, MP4, MP3, etc.
                  </p>
                </div>
                <input
                  className="hidden"
                  id="dropzone-file"
                  type="file"
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            </div>
            <button
              className={`${buttonPrimary} w-full mt-4`}
              onClick={handleUploadFile}
            >
              {loadingState === "fileUploading"
                ? "Uploading File"
                : "Upload File"}
            </button>
          </div>
          <div className="bg-ipv-background rounded-lg p-2">
            <ContentPreview file={file} />
          </div>
        </div>
      </div>

      {/* Step 2: Mint */}
      <div className={`card ${!stepOneComplete ? "opacity-50" : ""}`}>
        <h2 className={`${typographyH2} border-b border-b-gray-700 pb-4 mb-6`}>
          2. Metadata
        </h2>
        <div className="space-y-6">
          {/* Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-textPrimary">
              Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-text-primary mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="input w-full"
                  id="title"
                  placeholder="Title"
                  type="text"
                  value={mintData.title}
                  onChange={(e) =>
                    setMintData({ ...mintData, title: e.target.value })
                  }
                  disabled={!stepOneComplete}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-text-primary mb-2"
                  htmlFor="url"
                >
                  fileURL
                </label>

                <input
                  className="input w-full bg-gray-700 cursor-not-allowed"
                  id="url"
                  placeholder="Auto-filled URL"
                  type="text"
                  value={mintData.fileUrl}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-text-primary mb-2"
                  htmlFor="url"
                >
                  imageURL
                </label>

                <input
                  className="input w-full bg-gray-700 cursor-not-allowed"
                  id="url"
                  placeholder="Auto-filled URL"
                  type="text"
                  value={mintData.imageUrl}
                  readOnly
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-text-primary mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="input w-full"
                  id="description"
                  placeholder="Description"
                  rows={3}
                  value={mintData.description}
                  onChange={(e) =>
                    setMintData({ ...mintData, description: e.target.value })
                  }
                  disabled={!stepOneComplete}
                />
              </div>
            </div>
          </div>
          {/* Metadata */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-textPrimary">
              Attributes
            </h3>
            <div className="space-y-4" id="metadata-fields">
              {mintData.attributes.map((attr, i) => (
                <div key={i} className="flex items-end gap-4 mb-2">
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-text-primary mb-2"
                      htmlFor={`trait-type-${i}`}
                    >
                      Trait Type
                    </label>
                    <input
                      className="input w-full"
                      id={`trait-type-${i}`}
                      placeholder="e.g., Color"
                      type="text"
                      value={attr.trait_type}
                      onChange={(e) =>
                        updateMetadataField(i, "trait_type", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-text-primary mb-2"
                      htmlFor={`value-${i}`}
                    >
                      Value
                    </label>
                    <input
                      className="input w-full"
                      id={`value-${i}`}
                      placeholder="e.g., Blue"
                      type="text"
                      value={attr.value}
                      onChange={(e) =>
                        updateMetadataField(i, "value", e.target.value)
                      }
                    />
                  </div>
                  {i < mintData.attributes.length - 1 ? (
                    <button
                      className={`${buttonSecondary} p-2`}
                      onClick={() => removeMetadataField(i)}
                    >
                      ❌
                    </button>
                  ) : (
                    <button
                      className={`${buttonSecondary} mt-2`}
                      onClick={addMetadataField}
                      disabled={!stepOneComplete}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* License */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-text-primary">
              License
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-text-primary mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="input w-full"
                  id="price"
                  placeholder="Enter amount"
                  type="number"
                  value={mintData.price}
                  onChange={(e) =>
                    setMintData({ ...mintData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-text-primary mb-2"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <div className="flex gap-2">
                  <input
                    className="input w-1/2"
                    id="duration"
                    placeholder="Duration"
                    type="number"
                    value={mintData.duration}
                    onChange={(e) =>
                      setMintData({ ...mintData, duration: e.target.value })
                    }
                  />
                  <select
                    className="input w-1/2"
                    value={mintData.durationUnit}
                    onChange={(e) =>
                      setMintData({
                        ...mintData,
                        durationUnit: e.target.value,
                      })
                    }
                  >
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {file && showFileCard && (
            <FileCard
              title={mintData.title}
              fileTypeIcon={getFileIcon(file.type || "")}
              contentId={contentId}
              onImageGenerated={(file) => setMintFile(file)}
            />
          )}

          <div className="flex justify-between pt-4">
            <button
              className={`${buttonSecondary} w-full md:w-auto`}
              onClick={() => {
                setShowFileCard(true);
              }}
              disabled={!mintData.title}
            >
              Generate IpNFT
            </button>
            <button
              className={`${buttonPrimary} w-full md:w-auto`}
              onClick={handleUploadImage}
              disabled={!stepOneComplete || !mintFile}
            >
              {loadingState == "imageUploading"
                ? "Uploading IpNFT"
                : "Upload IpNFT"}
            </button>
          </div>
          <div>
            <button
              className={`${buttonPrimary} w-full md:w-auto`}
              onClick={handleMintSubmit}
              disabled={!stepTwoComplete}
            >
              {loadingState == "minting" ? "Minting" : " Mint IP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
