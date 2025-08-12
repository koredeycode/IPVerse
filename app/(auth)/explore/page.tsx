"use client";
import ContentItem, { Content } from "@/components/ContentItem";
import Link from "next/link";
import { useEffect, useState } from "react";

const fileTypes = [
  { label: "All", value: "all" },
  { label: "Video", value: "video" },
  { label: "Audio", value: "audio" },
  { label: "Image", value: "image" },
  { label: "Text", value: "text" },
];

const FilterButton = ({
  label,
  isActive = false,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full ${
        isActive
          ? "bg-ipv-accent text-white"
          : "bg-cardBg hover:bg-ipv-accent hover:text-white transition-colors"
      } px-4 text-sm font-medium text-textSecondary`}
      // } text-white px-4 text-sm font-medium text-textSecondary`}
    >
      <span>{label}</span>
    </button>
  );
};

// const sampleData: MediaItem[] = [
//   {
//     id: 1,
//     type: "video",
//     creator: "sophia_carter",
//     title: "Cosmic Dreamscape: A Journey Through a Digital Universe",
//     description: "A vibrant piece of digital art.",
//     image_url:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAq0JsfLoE2N7rIUHLPFVVNaAupdnydUlTynOP9CFh6s3ur06ycYqWk56aVfZU1qF_crUYD2TUf4mM0RvSZ-vdFwbgW3RebxWHkpcoRN4r2a-yEny4lmtZ8uC3w-JfalPQh_HWY0Hr81Zp2dRn6O3K5fa2HGRq2_G_9AtuLrSjD5eZS9dBdNTnOguRb7os62MflrVtGHcxSelBZmskcDWW2TTQSC9d55CKboD1ouR6Bs59BpZ-uT9mcNkSyPm_GFGVogecQzgD9F0I",
//   },
//   {
//     id: 2,
//     type: "audio",
//     creator: "ethan_bennet",
//     title: "Synthwave Sonata",
//     description: "An electrifying musical piece.",
//     image_url:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCB_3gnrsFf1qeEmfOb4NEZCK8NUxxbE-b_NgSJrBjB41M8Y5oKrwUCoYmaIlCU4PfK_rWMlfGKABscMQ3x2aH-2Vekb2UD7KY1gyBWIqfMDOJ-6xNG4sSsUTHSEYKew5IFzTogkj7Zb_vTxA8ZQIZIlNlpFH_dKufrQ56_WSGz-3kbzHhZISC57NGds0M5iZhNG5EtvmBrmNoMPa45BPloBxc2qCHa-TenRbk5THHwIVFTF5ySoHi160mFJxfhwuruWSd6bvURYRc",
//   },
//   {
//     id: 3,
//     type: "image",
//     creator: "olivia_hayes",
//     title: "Urban Reflections",
//     description: "A stunning series of photographs.",
//     image_url:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCOS7_K_wMtn5d3O8n1BzLd-Cfaek6Wsmc2XurG9k7pFeo9woU2D0wTF7gghQXUqZd2R4CkqasscFAvgYI0fUby7wBYmnGw1OY1QNXRQtaBZxIGREi5TwXNnC7-uuRCuaWZL7W13rBA6RaKXjdER-7CCQ8skltJ0H-pU5m8ruW4vxENgaRIHWTmaeG7Vy1U-DtRVMUZEvkiZnmLX77UTqLN_u7vFB3sNlOd3A8LAmoZ9L-0bX1schQOUxw3gdnHykDMWdD3GvbP22E",
//   },
//   {
//     id: 4,
//     type: "video",
//     creator: "noah_parker",
//     title: "Cybernetic Sculptures",
//     description: "A collection of futuristic 3D models.",
//     image_url:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuC5BQH1Haj_JI409mizi1F1R1JEislFOBtn0NoBFwdj6jcqSEuq_TL3focmiG6N-t4VIpNMSdP9HCxNqWGvjJzsrkRYzerc7cKKKInVFxr6iR8hRVRqaED7C-HY4iffev88LFVz_wgpf3n1B01lUAozfCxHtLR5vTlZrzf-Qm_oEGMS08-wfglu54vlbM4KO9pCpDzy1iDjomnBYb7Vxtq465Pcskf0R1wZ4He2g4FKzfiPS2ztPTxQ7e3ryt1lorSwuWAwHvaMM80",
//   },
//   {
//     id: 5,
//     type: "image",
//     creator: "ava_thompson",
//     title: "Mythical Creatures Illustrated",
//     description: "A book of fantasy illustrations.",
//     image_url:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuBJYalPNEV0Tu3DymsGNyhEQ5KQq19zxPmihIIaVsxhoV6aCY8eyP7Yoa4FKYOfYgBYBKQAUuDj49RomRnZA5Cjgiy4eD_xDslArnjvgrwC7Z50MJSmQZ6QHjvSTBSrh_vZsVammnKqRHPnXmy9m1NtNqCt-mR-88NkUAIFluUfwYW_fkSNlchhG5rxvbM1K8L-QzzyyU7iyge_40j1fjQSyZVXh8f9jK9zaLRkWBP5liiJBa4WcuLplP06iZJnpolcEZBRjcWtLms",
//   },
//   {
//     id: 6,
//     type: "audio",
//     creator: "caleb_foster",
//     title: "Future Cities Soundscape",
//     description: "Immersive sound design for film.",
//     image_url:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuA4-ZBSlnNh3rlkjgipvu5_vkgdg6NvmW6RdxQYroftxSzp8tIRYu-ZtVf70yHFbd5ouf2AneTMS2vlKdClIdkJQF0xz32H9MNvgkOZuouJjrE1eM4ukmbFXPeGD0JF5ChbNV5rmZMv_75nQFP-xdsimFuD0CaRGN0PQjMxaNYSJnsOgfjD5DL4-eLU4REfX5NaS-FdJzpIdlQccYiajKFG3N2NPWxClAK54XV4AVU3_gXqQ2L3BaQky7B1pBY-epyn-ctTTmEQKBo",
//   },
// ];

export const NavButton = ({
  page,
  isActive = false,
}: {
  page: number;
  isActive: boolean;
}) => {
  return (
    <Link
      // flex size-10 items-center justify-center rounded-full bg-[var(--accent-color)] text-sm font-bold text-white
      // flex size-10 items-center justify-center rounded-full text-sm text-textSecondary hover:bg-[var(--card-background)] hover:text-white transition-colors
      className={`flex size-10 items-center justify-center rounded-full text-sm ${
        isActive
          ? "bg-ipv-accent text-white font-bold"
          : "text-textSecondary hover:bg-cardBg hover:text-white transition-colors"
      }`}
      href="#"
    >
      {page}
    </Link>
  );
};

const Explore = () => {
  const [contents, setContents] = useState<Content[]>([]);
  // const [filteredContents, setFilteredContents] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["all"]);

  const filteredContents = selectedTypes.includes("all")
    ? contents
    : contents.filter((item) => selectedTypes.includes(item.type));

  useEffect(() => {
    const loadContents = async () => {
      const response = await fetch("/api/contents");
      const data = await response.json();

      setContents(data ?? []);
      // setFilteredContents(data ?? []);
    };
    loadContents();
  }, []);

  const handleFilterClick = (value: string) => {
    if (value === "all") {
      // Selecting "All" resets filter
      setSelectedTypes(["all"]);
    } else {
      setSelectedTypes((prev) => {
        // Remove "all" if a specific type is chosen
        const withoutAll = prev.filter((t) => t !== "all");

        if (withoutAll.includes(value)) {
          // If it's already selected, remove it
          const newSelection = withoutAll.filter((t) => t !== value);
          return newSelection.length === 0 ? ["all"] : newSelection;
        } else {
          // Add the new type
          return [...withoutAll, value];
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {fileTypes.map(({ label, value }, idx) => (
          <FilterButton
            key={value}
            label={label}
            isActive={selectedTypes.includes(value)}
            onClick={() => handleFilterClick(value)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredContents.map(
          ({ id, type, creator, title, description, imageUrl, createdAt }) => (
            <ContentItem
              key={id}
              id={id}
              type={type}
              creator={creator}
              title={title}
              description={description}
              imageUrl={imageUrl}
              createdAt={createdAt}
            />
          )
        )}
      </div>
      {/* <div className="flex items-center justify-center mt-8">
        <a
          className="flex size-10 items-center justify-center text-textSecondary hover:text-white transition-colors"
          href="#"
        >
          <div data-icon="CaretLeft" data-size="20px" data-weight="regular">
            <svg
              fill="currentColor"
              height="20px"
              viewBox="0 0 256 256"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </div>
        </a>
        {[1, 2, 3, 4, 5].map((page, idx) => (
          <NavButton key={idx} page={page} isActive={idx + 1 == 1} />
        ))}
        <a
          className="flex size-10 items-center justify-center text-textSecondary hover:text-white transition-colors"
          href="#"
        >
          <div data-icon="CaretRight" data-size="20px" data-weight="regular">
            <svg
              fill="currentColor"
              height="20px"
              viewBox="0 0 256 256"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
      </div> */}
    </>
  );
};

export default Explore;
