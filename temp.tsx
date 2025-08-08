"use client";

import { truncate } from "@/lib/utils";
import {
  useAuthState,
  useConnect,
  useLinkSocials,
  useModal,
  useSocials,
} from "@campnetwork/origin/react";
import { useActiveWallet, usePrivy } from "@privy-io/react-auth";
import React, { useState } from "react";

import { useBalance } from "wagmi";
import { buttonSecondary } from "./components/styles";

const Navbar = () => {
  const { logout } = usePrivy();
  const { wallet } = useActiveWallet();
  console.log(wallet);
  const { openModal: openCampModal } = useModal();

  const { connect, disconnect } = useConnect();
  const { authenticated } = useAuthState();
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: wallet?.address,
  });

  const { data, error, isLoading } = useSocials();
  const {
    linkTwitter,
    unlinkTwitter,
    linkSpotify,
    unlinkSpotify,
    linkTiktok,
    unlinkTiktok,
  } = useLinkSocials();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSocialToggle = (platform, connected) => {
    if (platform === "twitter") {
      connected ? unlinkTwitter() : linkTwitter();
    } else if (platform === "spotify") {
      connected ? unlinkSpotify() : linkSpotify();
    } else if (platform === "tiktok") {
      connected ? unlinkTiktok() : linkTiktok();
    }
  };

  return (
    <nav className="flex items-center justify-between h-16 border-b border-white/10 p-6">
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Search */}
        <label className="relative flex items-center min-w-48 max-w-sm">
          <div className="absolute left-3 text-textSecondary">
            {/* Search icon */}
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
            className="form-input w-full rounded-full border-none bg-cardBg h-10 placeholder:text-textSecondary pl-10 pr-4 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50"
            placeholder="Search creators or IPs"
          />
        </label>

        {/* Profile & Menu */}
        <div
          className="relative"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button className="button_primary hidden sm:flex items-center gap-2">
            <span>{wallet ? truncate(wallet?.address) : "0x00..00"}</span>
            <img
              alt="User avatar"
              className="h-6 w-6 roundedhandleSocialToggle
handleSocialToggle
handleSocialToggle-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdKkbOlxNwdxj6Cm2Hh1Lm10TLfrMoOz609lhTMsT21NJm5MonXui2M-as0cWgTt_zqa4uv-y8XSjc33f_wfvJqs9HRXIi7ZFA48fkfgFUOxShPG5kFMwCuZAGec71O-zEKA8zGkrdt7229v-daXDJWaFAKvMgcQapWFNTlaAZqfDpPj2EPquY1n9Cp4IPtiuiH8JLyMKOQA0bN9UedSZ_5c_nafoJ9pm8El0QiWFgzm3j6al_rDdMGrbKv0RxLHuZqkB5yIp4Klw"
            />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-cardBg border border-[var(--input-border)] rounded-xl shadow-lg p-4 z-50">
              {isLoading && (
                <div className="text-sm text-textSecondary">
                  Loading socials…
                </div>
              )}
              {error && (
                <div className="text-sm text-red-500">
                  Failed to load socials.
                </div>
              )}

              {!isLoading && !error && (
                <>
                  {/* Balance */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-textSecondary">Balance</span>
                    <span className="font-bold">1.234 ETH</span>
                  </div>

                  <div className="border-t border-[var(--input-border)] my-4"></div>

                  {/* Connected Accounts */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Connected Accounts
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "Twitter", key: "twitter" },
                        { name: "Spotify", key: "spotify" },
                        { name: "TikTok", key: "tiktok" },
                      ].map(({ name, key }) => {
                        const connected = data ?? [key] ?? false;
                        return (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
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
                                  <line
                                    x1="12"
                                    x2="12.01"
                                    y1="16"
                                    y2="16"
                                  ></line>
                                </svg>
                              )}
                              <span>{name}</span>
                            </div>

                            {connected ? (
                              <button
                                onClick={() => handleSocialToggle(key, true)}
                                className="text-xs text-red-500 hover:underline"
                              >
                                Disconnect
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSocialToggle(key, false)}
                                className="text-xs text-[var(--primary-color)] hover:underline"
                              >
                                Connect
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-[var(--input-border)] my-4"></div>
                  <button
                    onClick={disconnect}
                    className={`${buttonSecondary} w-full text-sm`}
                  >
                    Disconnect Wallet
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
