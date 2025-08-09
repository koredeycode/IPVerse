"use client";

import { CampProvider } from "@campnetwork/origin/react";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { basecampTestnet } from "wagmi/chains";

// Create a Wagmi config object
export const config = createConfig({
  chains: [basecampTestnet],
  transports: {
    [basecampTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmdzg9h4b01bpla0dk7geg7d9"
      clientId={"client-WY6NzgUBfSSaQptm2ky6CqDoQiWMkY5X4pYTsFMfFtp6H"}
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <CampProvider
            clientId="fce77d7a-8085-47ca-adff-306a933e76aa"
            // redirectUri="https://your-website.com"
          >
            {children}
          </CampProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
