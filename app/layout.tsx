import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CampModal } from "@campnetwork/origin/react";
import { Toaster } from "sonner";
import Providers from "./providers";
import { Suspense } from "react";
// import { Head } from "next/document";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IpVerse",
  description: "Discover and create decentralized content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <CampModal injectButton={false} />
            {children}
          </Providers>
          <Toaster theme="dark" />
        </Suspense>
      </body>
    </html>
  );
}
