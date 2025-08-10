"use client";
import {
  ALLOWED_AUDIO,
  ALLOWED_IMAGE,
  ALLOWED_TEXT,
  ALLOWED_VIDEO,
} from "@/lib/content";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ContentPreviewProps {
  file: File | null;
}

const ContentPreview = ({ file }: ContentPreviewProps) => {
  const [isRenderedView, setIsRenderedView] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");

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
    const isMarkdown = type === "text/markdown" || file.name.endsWith(".md");

    file.text().then(setContent);

    if (isMarkdown) {
      return (
        <div className="relative flex flex-col">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsRenderedView(!isRenderedView)}
              className="px-3 py-1 text-sm bg-cardBg text-textPrimary rounded hover:bg-textSecondary/20 transition"
            >
              {isRenderedView ? "Show Source" : "Show Rendered"}
            </button>
          </div>
          {isRenderedView ? (
            <div className="flex justify-center">
              <div className="prose prose-invert bg-gray-100 rounded text-black p-4 max-w-160 max-h-160 overflow-auto">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <pre className="bg-gray-100 text-black p-4 rounded max-w-160 max-h-160 overflow-auto text-sm">
                {content}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <pre className="bg-gray-100 text-black p-4 rounded max-h-80 overflow-auto text-sm">
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
