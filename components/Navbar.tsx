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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useBalance } from "wagmi";
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
    <nav className="flex items-center justify-end gap-4 h-16 border-b border-white/10 p-6">
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        {/* <label className="relative flex-1 flex items-center min-w-48 max-w-sm">
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
        </label> */}

        <Link
          href="https://faucet.campnetwork.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm w-full"
        >
          <button
            onClick={disconnect}
            className={`${buttonSecondary} w-full text-sm`}
          >
            Claim Faucet
          </button>
        </Link>
      </div>

      {/* ✅ closes .flex.items-center gap-4 */}
      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger className="sm:flex items-center gap-2 cursor-pointer">
            {/* <button className="button_primary hidden sm:flex items-center gap-2"> */}
            <span>{wallet ? truncate(wallet?.address) : "0x00..00"}</span>
            <img
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
                    openCampModal();
                  }}
                  className={`${buttonSecondary} w-full text-sm`}
                >
                  View Origin
                </button>

                <button
                  onClick={() => {
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
    </nav>
  );
};

export default Navbar;
