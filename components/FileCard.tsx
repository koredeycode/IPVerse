// import html2canvas from "html2canvas-pro";
// import { QRCodeSVG } from "qrcode.react";
// import { useEffect, useRef } from "react";

// type FileCardProps = {
//   title: string;
//   fileTypeIcon: string;

//   contentId: string;
//   onImageGenerated: (file: File) => void; // Send File object to parent
// };

// export default function FileCard({
//   title,
//   fileTypeIcon,

//   contentId,
//   onImageGenerated,
// }: FileCardProps) {
//   const cardRef = useRef<HTMLDivElement>(null);

//   let creator = "@";

//   const storedUser = localStorage.getItem("IPVERSE_USER");
//   if (storedUser) {
//     const parsedUser = JSON.parse(storedUser);
//     creator = `@${parsedUser.twitter ?? ""}`;
//   }

//   useEffect(() => {
//     if (!cardRef.current) return;

//     // Automatically convert to File object on mount/update
//     html2canvas(cardRef.current, {
//       backgroundColor: "#ffffff",
//       scale: 2,
//       useCORS: true,
//     }).then((canvas) => {
//       canvas.toBlob((blob) => {
//         if (blob) {
//           const file = new File([blob], `${title}.png`, { type: "image/png" });
//           onImageGenerated(file);
//         }
//       }, "image/png");
//     });
//   }, [title, fileTypeIcon, contentId]);

//   return (
//     <div
//       ref={cardRef}
//       className="w-[256px] h-[256px] p-6 bg-white shadow-lg border flex flex-col justify-between"
//     >
//       {/* Header: IPVerse Branding */}
//       <div className="flex items-center justify-center gap-3 text-ipv-primary">
//         <svg
//           fill="currentColor"
//           viewBox="0 0 48 48"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-8 h-8"
//         >
//           <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
//         </svg>
//         <span className="font-bold text-xl">IPVerse</span>
//       </div>

//       {/* Content: Icon, Title, Creator */}
//       <div className="flex justify-center items-center gap-2">
//         {/* File Icon */}
//         <div className="text-2xl">{fileTypeIcon}</div>

//         {/* Title and Creator */}
//         <div className="text-center">
//           <h2 className="font-semibold text-2xl truncate max-w-[400px]">
//             {title}
//           </h2>
//         </div>
//       </div>

//       {/* Footer: QR Code */}
//       <div className="flex justify-center gap-2 items-end">
//         <p className="text-base text-gray-500 mt-2">By {creator}</p>
//         <QRCodeSVG
//           value={`http://localhost:3000/content/${contentId}`}
//           size={64}
//         />
//       </div>
//     </div>
//   );
// }

import html2canvas from "html2canvas-pro";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";

type FileCardProps = {
  title: string;
  fileTypeIcon: string;
  contentId: string;
  onImageGenerated: (file: File) => void;
};

export default function FileCard({
  title,
  fileTypeIcon,
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
  }, [title, fileTypeIcon, contentId]);

  return (
    <div
      ref={cardRef}
      className="relative w-[256px] h-[320px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col"
    >
      {/* Top Tab to simulate a file/document */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl flex items-center px-3">
        <span className="text-xs text-white font-medium">IPVerse File</span>
      </div>

      {/* Branding */}
      <div className="flex items-center justify-center gap-2 pt-8 pb-3 text-ipv-primary">
        <svg
          fill="currentColor"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
        </svg>
        <span className="font-bold text-lg">IPVerse</span>
      </div>

      {/* File Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-4xl mb-2">{fileTypeIcon}</div>
        <h2 className="font-semibold text-lg truncate max-w-[200px]">
          {title}
        </h2>
        <p className="text-xs text-gray-500 mt-1">By {creator}</p>
      </div>

      {/* QR Footer */}
      <div className="flex justify-center items-center gap-2 p-3 border-t border-gray-200 bg-gray-50">
        <QRCodeSVG
          value={`http://localhost:3000/content/${contentId}`}
          size={48}
        />
      </div>
    </div>
  );
}
