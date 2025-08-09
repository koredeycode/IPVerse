"use client";
import {
  ALLOWED_AUDIO,
  ALLOWED_IMAGE,
  ALLOWED_TEXT,
  ALLOWED_VIDEO,
  getFileIcon,
} from "@/lib/content";
import { useState } from "react";

interface ContentPreviewProps {
  file: File | null;
}

const ContentPreview = ({ file }: ContentPreviewProps) => {
  if (!file) {
    return <p>❓ Preview not available</p>;
  }
  const type = file.type;

  if (ALLOWED_IMAGE.includes(type)) {
    return (
      <div>
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="max-w-xs rounded"
        />
      </div>
    );
  }

  if (ALLOWED_TEXT.includes(type)) {
    const [content, setContent] = useState<string>("");

    file.text().then(setContent);

    return (
      <div>
        <pre className="bg-gray-100 text-black p-2 rounded max-h-80 overflow-auto text-sm">
          {content}
        </pre>
      </div>
    );
  }

  if (ALLOWED_AUDIO.includes(type)) {
    return (
      <div>
        <audio controls>
          <source src={URL.createObjectURL(file)} type={type} />
        </audio>
      </div>
    );
  }

  if (ALLOWED_VIDEO.includes(type)) {
    return (
      <div>
        <video controls className="max-w-xs rounded">
          <source src={URL.createObjectURL(file)} type={type} />
        </video>
      </div>
    );
  }
};

export default ContentPreview;
