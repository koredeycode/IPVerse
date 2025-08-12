import Link from "next/link";

export type Content = {
  id: string;
  type: "video" | "audio" | "image" | "text";
  title: string;
  creator: string;
  description: string;
  imageUrl: string;
  // href: string;
};

const ContentItem = ({
  id,
  title,
  creator,
  description,
  imageUrl,
  type,
}: Content) => {
  return (
    // <div className="flex flex-col gap-3 group bg-cardBg rounded-lg">
    //   <Link
    //     className="w-[256px] h-[320px] bg-center bg-no-repeat aspect-square bg-contain rounded-lg overflow-hidden relative self-center"
    //     href={`/content/${id}`}
    //     style={{
    //       backgroundImage: `url('${imageUrl}')`,
    //     }}
    //   >
    //     <div className=" absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-all duration-300 flex items-center justify-center">
    //       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
    //         <svg
    //           fill="currentColor"
    //           width="32px"
    //           height="32px"
    //           viewBox="0 0 0.96 0.96"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path d="M0.877 0.464C0.796 0.276 0.644 0.16 0.48 0.16s-0.316 0.116 -0.397 0.304a0.04 0.04 0 0 0 0 0.032C0.164 0.684 0.316 0.8 0.48 0.8s0.316 -0.116 0.397 -0.304a0.04 0.04 0 0 0 0 -0.032M0.48 0.72c-0.127 0 -0.247 -0.092 -0.316 -0.24C0.233 0.332 0.353 0.24 0.48 0.24s0.247 0.092 0.316 0.24c-0.069 0.148 -0.189 0.24 -0.316 0.24m0 -0.4a0.16 0.16 0 1 0 0.16 0.16 0.16 0.16 0 0 0 -0.16 -0.16m0 0.24a0.08 0.08 0 1 1 0.08 -0.08 0.08 0.08 0 0 1 -0.08 0.08" />
    //         </svg>
    //       </div>
    //     </div>
    //   </Link>
    //   <div className="p-4">
    //     <h3 className="font-semibold truncate">{title}</h3>
    //     <div className="flex justify-between">
    //       <Link href={`/profile/${creator}`}>
    //         <p className="text-textSecondary text-sm">by @{creator}</p>
    //       </Link>
    //       <p className="text-textSecondary text-sm">{type}</p>
    //     </div>
    //   </div>
    // </div>
    <article className="flex flex-col gap-3 group bg-cardBg rounded-lg">
      <Link href={`/content/${id}`}>
        <div className="rounded-lg overflow-hidden relative self-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain bg-center bg-no-repeat"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
              {/* Eye SVG */}
              <svg
                fill="currentColor"
                width="32px"
                height="32px"
                viewBox="0 0 0.96 0.96"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.877 0.464C0.796 0.276 0.644 0.16 0.48 0.16s-0.316 0.116 -0.397 0.304a0.04 0.04 0 0 0 0 0.032C0.164 0.684 0.316 0.8 0.48 0.8s0.316 -0.116 0.397 -0.304a0.04 0.04 0 0 0 0 -0.032M0.48 0.72c-0.127 0 -0.247 -0.092 -0.316 -0.24C0.233 0.332 0.353 0.24 0.48 0.24s0.247 0.092 0.316 0.24c-0.069 0.148 -0.189 0.24 -0.316 0.24m0 -0.4a0.16 0.16 0 1 0 0.16 0.16 0.16 0.16 0 0 0 -0.16 -0.16m0 0.24a0.08 0.08 0 1 1 0.08 -0.08 0.08 0.08 0 0 1 -0.08 0.08" />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold truncate">
          <Link href={`/content/${id}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="flex justify-between text-sm text-textSecondary">
          <span>
            by{" "}
            <Link href={`/profile/${creator}`} className="hover:underline">
              @{creator}
            </Link>
          </span>
          <span>{type}</span>
        </div>
      </div>
    </article>
  );
};

export default ContentItem;
