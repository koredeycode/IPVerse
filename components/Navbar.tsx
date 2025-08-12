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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
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

  // console.log("Social:", data);

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

  const { openModal: openCampModal } = useModal();

  const { connect, disconnect } = useConnect();
  const { authenticated } = useAuthState();

  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: wallet?.address as `0x${string}`,
  });

  useEffect(() => {
    if (!balance) return;
    const hasEnoughCamp = balance ? balance.value > parseEther("0.01") : false;

    if (!hasEnoughCamp && !isLoadingBalance) {
      toast.error("Insufficient balance to mint a generation.", {
        description:
          "You need at least 0.01 $CAMP in your wallet to mint. Click faucet in the navbar to claim some test $CAMP",
      });
      return;
    }
  }, [balance]);

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

            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger className="sm:flex items-center gap-2 cursor-pointer">
                  <span>{wallet ? truncate(wallet?.address) : "0x00..00"}</span>
                  <Image
                    width={8}
                    height={8}
                    alt="User avatar"
                    className="h-8 w-8 rounded-full"
                    src={`https://unavatar.io/x/${getLoggedInUserTwitter()}`}
                  />
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
                          router.push(`/profile/${getLoggedInUserTwitter()}`);
                        }}
                        className={`${buttonSecondary} w-full text-sm`}
                      >
                        View Profile
                      </button>
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
