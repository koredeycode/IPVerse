// pages/ProfilePage.tsx
"use client";
import { getExpiryInfo } from "@/lib/content";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// components/ProfileHeader.tsx

type ProfileHeaderProps = {
  twitter: string;
  bio: string;
  title: string;
};

function ProfileHeader({ title, bio, twitter }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="profile_image bg-center bg-no-repeat bg-cover w-32 h-32 rounded-full"
        style={{ backgroundImage: `url(https://unavatar.io/x/${twitter})` }}
      />
      <div className="profile_info">
        <h1 className="profile_name mt-4">{twitter}</h1>
        <p className="profile_bio">{title}</p>
        {/* <p className="text-sm text-text-secondary">Joined in {joined}</p> */}
      </div>
      <p className="max-w-xl mx-auto mt-4 typography_body">{bio}</p>
    </div>
  );
}

type Content = {
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
    <div className="flex flex-col gap-3 group bg-cardBg rounded-lg">
      <Link
        className="w-[256px] h-[320px] bg-center bg-no-repeat aspect-square bg-contain rounded-lg overflow-hidden relative self-center"
        href={`/content/${id}`}
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        <div className=" absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
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
      </Link>
      <div className="p-4">
        <h3 className="font-semibold truncate">{title}</h3>
        <div className="flex justify-between">
          <Link href={`/profile/${creator}`}>
            <p className="text-textSecondary text-sm">by @{creator}</p>
          </Link>
          <p className="text-textSecondary text-sm">{type}</p>
        </div>
      </div>
    </div>
  );
};
// components/ContentsGrid.tsx

type ContentsGridProps = {
  contents: Content[];
};

function ContentsGrid({ contents }: ContentsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4 ">
      {contents.map(({ id, type, creator, title, description, imageUrl }) => (
        <ContentItem
          key={id}
          id={id}
          type={type}
          creator={creator}
          title={title}
          description={description}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
}

// components/SubscriptionList.tsx

type Subscription = {
  price: number;
  contentTitle: string;
  contentId: string;
  duration: number;
  $createdAt: string;
};

// components/ProfileTabs.tsx

type ProfileTabsProps = {
  activeTab: string;
  onChange: (tab: string) => void;
};

function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
  const tabs = ["Contents", "Subscriptions"];
  return (
    <div className="border-b border-gray-800 mt-10">
      <nav className="-mb-px flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`py-4 px-1 border-b-2 font-semibold ${
              activeTab === tab
                ? "border-primary-color text-primary-color"
                : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}

type SubscriptionListProps = {
  subscriptions: Subscription[];
};

function SubscriptionList({ subscriptions }: SubscriptionListProps) {
  return (
    <div className="mt-10">
      <h3 className="section_title">Active Subscriptions</h3>
      <div className="space-y-4 gap-4 flex">
        {subscriptions.map((sub, idx) => {
          const { expiresIn, expiryDate } = getExpiryInfo(
            sub.duration,
            sub.$createdAt
          );

          return (
            <Link href={`/content/${sub.contentId}`}>
              <div key={idx} className="card flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-white bg-center"
                  style={{ backgroundImage: `url(/logo.png)` }}
                />
                <div>
                  <p className="font-semibold text-text-primary">
                    {sub.contentTitle}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {sub.price} CAMP
                  </p>
                  <p className="text-sm text-text-secondary">
                    Active till {expiryDate} ({expiresIn})
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Mock API calls
async function fetchUser(twitter: string) {
  const response = await fetch(`/api/users?twitter=${twitter}`);
  const data = await response.json();

  return Promise.resolve(data[0]);
}

async function fetchContents(twitter: string) {
  const response = await fetch(`/api/contents?creator=${twitter}`);
  const data = await response.json();

  return Promise.resolve(data);
}

async function fetchSubscriptions(twitter: string) {
  const response = await fetch(`/api/subscriptions?subscriber=${twitter}`);
  const data = await response.json();
  return Promise.resolve(data);
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [contents, setContents] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Contents");

  const params = useParams();
  const twitter = params.twitter?.toString() || "";

  useEffect(() => {
    fetchUser(twitter).then(setUser);
    fetchContents(twitter).then(setContents);
    fetchSubscriptions(twitter).then(setSubscriptions);
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <ProfileHeader title={user.title} bio={user.bio} twitter={user.twitter} />
      <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "Contents" && <ContentsGrid contents={contents} />}
      {activeTab === "Subscriptions" && (
        <SubscriptionList subscriptions={subscriptions} />
      )}
    </div>
  );
}
