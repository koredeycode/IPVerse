"use client";
import { useState } from "react";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return;

    console.log("File", file);
    console.log("Title", title);
    // // const contentUri = await uploadToIPFS(file);
    // await onboard({
    //   contentUri,
    //   metadata: { title, tags: ["tutorial"] },
    //   royalty: 10,
    // });
    alert("Content minted!");
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Content Title"
        className="border p-2 w-full"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="my-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Mint IP
      </button>
    </div>
  );
};

export default UploadForm;
