"use client";

import ConnectSection from "@/components/ConnectSection";
import { useAuthState, useConnect, useModal } from "@campnetwork/origin/react";
import { useActiveWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useEffect } from "react";

const SignInPage = () => {
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
    <main className="flex-grow flex items-center justify-center">
      <ConnectSection
        wallet={wallet}
        authenticated={authenticated}
        openCampModal={openModal}
        login={login}
        disconnect={disconnect}
      />
    </main>
  );
};

export default SignInPage;
