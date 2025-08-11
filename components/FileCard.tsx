import html2canvas from "html2canvas-pro";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";

type FileCardProps = {
  title: string;

  contentId: string;
  onImageGenerated: (file: File) => void;
};

export default function FileCard({
  title,

  contentId,
  onImageGenerated,
}: FileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  let creator = "@";
  const storedUser = localStorage.getItem("IPVERSE_USER");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    creator = `@${parsedUser.twitter ?? ""}`;
  }

  useEffect(() => {
    if (!cardRef.current) return;

    html2canvas(cardRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `${title}.png`, { type: "image/png" });
          onImageGenerated(file);
        }
      }, "image/png");
    });
  }, [title, contentId]);

  return (
    <div
      ref={cardRef}
      className="relative w-[256px] h-[320px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col"
    >
      {/* Top Tab to simulate a file/document */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl flex items-center px-3">
        <span className="text-xs text-white font-medium">IPVerse File</span>
      </div>

      {/* File Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        {/* <div className="text-4xl mb-2">{fileTypeIcon}</div> */}
        <div className="text-7xl mb-6">📄</div>
        <h2 className="font-semibold text-lg truncate max-w-[200px] text-black">
          {title}
        </h2>
        <p className="text-xs text-gray-500 mt-1">By {creator}</p>
      </div>

      {/* QR Footer */}
      <div className="flex justify-between items-end gap-2 p-3 border-t border-gray-200 bg-gray-50">
        {/* Branding */}
        <div className="flex items-center justify-center text-blue-500">
          © Ipverse {new Date().getFullYear()}
        </div>
        {contentId && (
          <QRCodeSVG
            value={`${process.env.NEXT_PUBLIC_IPVERSE_APP_URL}/content/${contentId}`}
            size={48}
          />
        )}
      </div>
    </div>
  );
}
