"use client";

import ConnectSection from "@/components/ConnectSection";
import { useAuthState, useConnect, useModal } from "@campnetwork/origin/react";
import { useActiveWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignInPage = () => {
  const {
    ready,
    login,
    linkWallet,
    logout,
    authenticated: privyAuthenticated,
  } = usePrivy();

  const { wallets } = useWallets();
  const { wallet } = useActiveWallet();

  const { isOpen, openModal, closeModal } = useModal();
  const { connect, disconnect } = useConnect();
  const { authenticated } = useAuthState();

  console.log("isauth", authenticated);
  const router = useRouter();
  const { setActiveWallet } = useSetActiveWallet();

  useEffect(() => {
    // set the latest wallet as the active wallet
    // this "fixes" a Privy quirk where wagmi prefers a previously connected extension wallet such as MetaMask
    // over newly created Privy embedded wallets
    // feel free to write your own logic to handle which wallet to set as active
    if (wallets.length > 0) setActiveWallet(wallets[0]);
  }, [wallets]);

  // useEffect(() => {
  //   const redirectUserIfLoggedIn = async () => {
  //     console.log("redirecting");
  //     if (ready && authenticated && privyAuthenticated && wallet) {
  //       const user = (await getUserInfo(wallet.address))[0];

  //       if (user) {
  //         localStorage.setItem("IPVERSE_USER", JSON.stringify(user));
  //         router.push("/explore");
  //       } else {
  //         router.push("/signup");
  //         router.refresh();
  //       }
  //     }
  //     redirectUserIfLoggedIn();
  //   };
  // }, [ready, authenticated, privyAuthenticated, router]);

  return (
    <main className="flex-grow flex items-center justify-center">
      <ConnectSection
        wallet={wallet}
        authenticated={authenticated}
        privyAuthenticated={privyAuthenticated}
        openCampModal={openModal}
        login={privyAuthenticated ? linkWallet : login}
        disconnect={disconnect}
      />
    </main>
  );
};

export default SignInPage;
