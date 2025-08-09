"use client";
import ContentPreview from "@/components/ContentPreview";
import { uploadSchema, mintSchema } from "@/schemas/contentSchemas";
import { useState } from "react";

export default function Create() {
  const [file, setFile] = useState<File | null>(null);
  const [stepOneComplete, setStepOneComplete] = useState(false);
  const [mintData, setMintData] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
    metadata: [],
    price: "",
    duration: "",
    durationUnit: "Weeks",
  });

  function handleUploadSubmit() {
    const result = uploadSchema.safeParse({ file });
    if (!result.success) {
      alert(result.error.errors[0].message);
      return;
    }
    setStepOneComplete(true);
  }

  function handleMintSubmit() {
    const result = mintSchema.safeParse({
      ...mintData,
      price: Number(mintData.price),
      duration: Number(mintData.duration),
    });
    if (!result.success) {
      alert(result.error.errors[0].message);
      return;
    }
    alert("Minting...");
  }
  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="typography_h1 text-center md:text-left">Mint your IP</h1>
        <div className="card">
          <h2 className="typography_h2 border-b border-b-gray-700 pb-4 mb-6">
            1. Upload
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                className="block text-sm font-medium text-text-primary mb-2"
                htmlFor="upload-content"
              >
                Upload Content
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card-background border-text-secondary hover:bg-background-color transition"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M12 16v-4m0 0l-2-2m2 2l2-2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-text-secondary">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-text-secondary">
                      SVG, PNG, JPG, GIF, MP4, etc.
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
                className="button_primary w-full mt-4"
                onClick={handleUploadSubmit}
              >
                Upload and Continue
              </button>
            </div>
            <div className="flex flex-col items-center justify-center bg-background-color rounded-lg p-4">
              {/* <div
                className="w-full h-64 bg-center bg-no-repeat aspect-video bg-cover rounded-lg mb-4"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoGM-wh8XdFbT4cqRubgfWG4bKtheu-dQq6cH_3KPZ90XcPIyHv0sZnTuV9bWBIhnYpRv-5Zcs7h5aroQ-qrxr0yOys2Y1HQ8o6GnhmBiqCZ7bjRwYwI0HgBpitamcEvdFWaKKrruo6QCx9HTJijx_-6o8-M1vPN5bs-gcWjbGwXVYKnVk4xM1l0vDURHPS8DeIuM_Kiak_vO1IzdOZzlp_svQJ868XqPTPQd3DIdG-fgdYaHkjJktg8GEzmundpyymsnA32YyEdo')`,
                }}
              ></div>
              <p className="typography_body text-text-secondary text-center text-sm">
              Your content will appear here once uploaded.
              </p> */}
              <h3 className="typography_h2 text-center text-lg">
                Content Preview
              </h3>
              <ContentPreview file={file} />
            </div>
          </div>
        </div>

        <div className={`card ${!stepOneComplete ? "opacity-50" : ""}`}>
          <h2 className="typography_h2 border-b border-b-gray-700 pb-4 mb-6">
            2. Mint
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">
                Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-text-primary mb-2"
                    htmlFor="content-title"
                  >
                    Title
                  </label>
                  <input
                    className="input w-full"
                    id="content-title"
                    placeholder="Enter the title"
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
                    htmlFor="content-url"
                  >
                    URL
                  </label>
                  <input
                    className="input w-full bg-gray-700 cursor-not-allowed"
                    id="content-url"
                    placeholder="Auto-filled after upload"
                    // readonly
                    type="text"
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
                    placeholder="Describe your content"
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
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">
                Metadata
              </h3>
              <div className="space-y-4" id="metadata-fields">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-text-primary mb-2"
                      htmlFor="trait-type-1"
                    >
                      Trait Type
                    </label>
                    <input
                      className="input w-full"
                      id="trait-type-1"
                      placeholder="e.g., Color"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium text-text-primary mb-2"
                      htmlFor="value-1"
                    >
                      Value
                    </label>
                    <input
                      className="input w-full"
                      id="value-1"
                      placeholder="e.g., Blue"
                      type="text"
                    />
                  </div>
                  <button className="button_secondary p-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
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
                      placeholder="e.g., 6"
                      type="number"
                    />
                    <select className="input w-1/2" id="duration-unit">
                      <option>Weeks</option>
                      <option>Months</option>
                      <option>Years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                className="button_primary w-full md:w-auto"
                onClick={handleMintSubmit}
                disabled={!stepOneComplete}
              >
                Mint IP
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
