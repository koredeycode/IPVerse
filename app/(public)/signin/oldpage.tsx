"use client";

import { useEffect } from "react";

import {
  useAuthState,
  useConnect,
  CampModal,
  useModal,
} from "@campnetwork/origin/react";

import { usePrivy, useWallets, useActiveWallet } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import ConnectSection from "@/components/ConnectSection";

function signin() {
  const {
    ready,
    login,
    logout,
    authenticated: privyAuthenticated,
  } = usePrivy();
  const { wallets } = useWallets();
  const { wallet } = useActiveWallet();

  const { isOpen, openModal, closeModal } = useModal();
  const { connect, disconnect } = useConnect();
  const { authenticated } = useAuthState();

  const { setActiveWallet } = useSetActiveWallet();
  useEffect(() => {
    // set the latest wallet as the active wallet
    // this "fixes" a Privy quirk where wagmi prefers a previously connected extension wallet such as MetaMask
    // over newly created Privy embedded wallets
    // feel free to write your own logic to handle which wallet to set as active
    if (wallets.length > 0) setActiveWallet(wallets[0]);
  }, [wallets]);
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      {/* <CampModal injectButton={false} /> */}
      <ConnectSection
        wallet={wallet}
        authenticated={authenticated}
        openCampModal={openModal}
        login={login}
        disconnect={disconnect}
        closeCampModal={closeModal}
        // logout={logout}
      />
      {/* {privyAuthenticated && (
          <button
            className="bg-black text-white cursor-pointer p-4"
            disabled={!ready || (ready && !privyAuthenticated)}
            onClick={logout}
          >
            Disconnect Wallet
          </button>
        )} */}
    </div>
  );
}
export default signin;
