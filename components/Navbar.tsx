"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLoggedInUserTwitter, truncate } from "@/lib/utils";
import {
  useAuthState,
  useConnect,
  useLinkSocials,
  useModal,
  useSocials,
} from "@campnetwork/origin/react";
import { useActiveWallet, usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useBalance } from "wagmi";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { buttonSecondary } from "./styles";

type SocialLinksStatus = {
  spotify: boolean;
  twitter: boolean;
  tiktok: boolean;
  // discord: boolean;
  // telegram: boolean;
};

export const ConnectedSocials = () => {
  const { data, error, isLoading } = useSocials();

  const socials = data as SocialLinksStatus;

  console.log("Social:", data);

  const {
    linkTwitter,
    unlinkTwitter,

    linkSpotify,
    unlinkSpotify,

    linkTiktok,
    unlinkTiktok,
  } = useLinkSocials();

  if (isLoading || error) {
    return (
      <>
        {isLoading && (
          <div className="text-sm text-textSecondary">Loading socials…</div>
        )}
        {error && (
          <div className="text-sm text-red-500">Failed to load socials.</div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-3">
      {[
        {
          name: "Twitter",
          key: "twitter",
          link: linkTwitter,
          unlink: unlinkTwitter,
        },
        {
          name: "Spotify",
          key: "spotify",
          link: linkSpotify,
          unlink: unlinkSpotify,
        },
        {
          name: "TikTok",
          key: "tiktok",
          link: linkTiktok,
          unlink: unlinkTiktok,
        },
      ].map(({ name, key, link, unlink }) => {
        let connected;
        if (name == "twitter") {
          connected = socials?.twitter;
        }
        if (name == "spotify") {
          connected = socials?.spotify;
        }
        if (name == "tiktok") {
          connected = socials?.tiktok;
        }

        return (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {connected ? (
                <svg
                  className="text-green-500"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              ) : (
                <svg
                  className="text-gray-500"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
              )}
              <span>{name}</span>
            </div>

            {connected ? (
              <button
                onClick={() => unlink()}
                className="text-xs text-red-500 hover:underline"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => link()}
                className="text-xs text-ipv-primary hover:underline"
              >
                Connect
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const { logout } = usePrivy();

  const { wallet } = useActiveWallet();
  console.log("Privy Wallet", wallet);

  const { openModal: openCampModal } = useModal();

  const { connect, disconnect } = useConnect();
  const { authenticated } = useAuthState();

  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: wallet?.address as `0x${string}`,
  });

  const [search, setSearch] = useState("");
  const router = useRouter();

  // const handleSocialToggle = (platform: string, connected: boolean) => {
  //   if (platform === "twitter") {
  //     connected ? unlinkTwitter() : linkTwitter();
  //   } else if (platform === "spotify") {
  //     connected ? unlinkSpotify() : linkSpotify();
  //   } else if (platform === "tiktok") {
  //     connected ? unlinkTiktok() : linkTiktok();
  //   }
  // };

  return (
    <nav className="sticky top-0 z-50 bg-ipv-background/80 backdrop-blur-sm">
      <div className="px-4">
        <div className="flex justify-between items-center border-b border-solid border-white/10 py-2">
          {/*Logo*/}
          <div className="flex items-center gap-3">
            {/* <div className="size-8 bg-yellow-100">
            <svg
              className="text-ipv-primary"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
            </svg>
          </div> */}
            <Logo />
            {/* Navigation */}
            <nav className="flex gap-2">
              <NavLink
                href="/explore"
                label="Explore"
                icon={
                  <svg
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 256 256"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"></path>
                  </svg>
                }
              />
              <NavLink
                href="/create"
                label="Create"
                icon={
                  <svg
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 256 256"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                  </svg>
                }
              />
              {/* <SidebarNavLink
                  href="/analytics"
                  label="Analytics"
                  icon={
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 256 256"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,144a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  }
                /> */}
            </nav>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="https://faucet.campnetwork.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm w-full"
              >
                <button className={`${buttonSecondary} w-full text-sm`}>
                  Claim Faucet
                </button>
              </Link>
              <div>
                <button
                  onClick={() => {
                    openCampModal();
                  }}
                  className={`${buttonSecondary} w-full text-sm`}
                >
                  Origin
                </button>
              </div>
            </div>

            {/* ✅ closes .flex.items-center gap-4 */}
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger className="sm:flex items-center gap-2 cursor-pointer">
                  {/* <button className="button_primary hidden sm:flex items-center gap-2"> */}
                  <span>{wallet ? truncate(wallet?.address) : "0x00..00"}</span>
                  <Image
                    width={8}
                    height={8}
                    alt="User avatar"
                    className="h-8 w-8 rounded-full"
                    src={`https://unavatar.io/x/${getLoggedInUserTwitter()}`}
                  />
                  {/* </button> */}
                </PopoverTrigger>
                <PopoverContent className="bg-transparent outline-none border-none right-1">
                  <div className="absolute right-0 w-72 bg-cardBg text-textSecondary border border-[var(--input-border)] rounded-xl shadow-lg p-4">
                    {isLoadingBalance ? (
                      <div className="text-sm text-textSecondary">
                        Loading balance...
                      </div>
                    ) : (
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-textSecondary">Balance</span>
                        <span className="font-bold">
                          {balance?.formatted.slice(0, 7)} CAMP
                        </span>
                      </div>
                    )}

                    <div className="border-t border-[var(--input-border)] my-4"></div>

                    {/* Socials */}
                    {/* <div>
                <h3 className="text-sm font-medium mb-3">
                  Origin Connected Accounts
                </h3>
                <ConnectedSocials />
              </div>
              <div className="border-t border-[var(--input-border)] my-4"></div> */}
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => {
                          disconnect();
                          logout();
                          localStorage.clear();
                          router.push("/signin");
                        }}
                        className={`${buttonSecondary} w-full text-sm`}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
{
  /* Search */
}
{
  /* <label className="relative flex-1 flex items-center min-w-48 max-w-sm">
          <div
            className="absolute left-3 text-textSecondary"
            data-icon="MagnifyingGlass"
            data-size="20px"
            data-weight="regular"
          >
            <svg
              fill="currentColor"
              height="20px"
              viewBox="0 0 256 256"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </div>
          <input
            className="form-input w-full rounded-full border-none bg-cardBg h-10 placeholder:text-textSecondary pl-10 pr-4 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-ipv-primarytext-ipv-primary focus:ring-opacity-50"
            placeholder="Search creators or IPs"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label> */
}
