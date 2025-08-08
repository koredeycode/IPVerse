"use client";

import { useAuthState, useConnect, useModal } from "@campnetwork/origin/react";
import { useActiveWallet, usePrivy } from "@privy-io/react-auth";
import { redirect } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { logout } = usePrivy();

  const { wallet } = useActiveWallet();
  const { openModal: openCampModal } = useModal();

  const { connect, disconnect } = useConnect();
  const { authenticated } = useAuthState();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">IPVerse</h1>
      <div>
        <span className="mr-4">
          {wallet?.address?.slice(0, 6)}...{wallet?.address?.slice(-4)}
        </span>
        <button onClick={disconnect} className="bg-red-500 px-4 py-2 rounded">
          Disconnect
        </button>
        <button
          onClick={() => {
            logout();
            redirect("/signin");
          }}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      {authenticated && (
        <>
          <button
            onClick={openCampModal}
            className="bg-black text-white cursor-pointer p-4"
          >
            Open Modal
          </button>
          <button
            className="bg-black text-white cursor-pointer p-4"
            onClick={() => {
              disconnect();
            }}
          >
            Disconnect
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
