import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  buttonPrimary,
  buttonSecondary,
  typographyBody,
  typographyH1,
  typographyH2,
} from "@/components/styles";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="relative flex size-full min-h-screen flex-col bg-ipv-background overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <section
            className="relative flex min-h-[80vh] items-center justify-center bg-cover bg-center py-20 text-center"
            style={{
              backgroundImage: `linear-gradient(
          to bottom,
          rgba(18, 18, 18, 0.8) 0%,
          var(--ipv-background) 100%
        ),
        url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmSWBlvHO4PwxpVAc3SjDAuh8LnkZB_5Z9JRn7qsz0f572twpI7vY1w0qOxUZjKdC4bm1WCAWRHpPp4KgPro-vVuNBEJgoRh3O1kFFTqlo9b1bIyG1Oq565zKwQokuBZRTQg9VIo2Mq23LJ1o8pR8nK5gfBGIVxVMVKzBfcEAh6CBUzhB3qLTVDgymcajZNWB6sGGhg-2_evnJdLh3K19eulyLSI2Vbhz3jpadgbJa65nv8Qtho2L8nupdA2Yq97BDcioxzW54Zgg')`,
            }}
          >
            <div className="container mx-auto px-4">
              <h1 className={`!${typographyH1} text-white`}>
                Unlock the Power of Your Ideas
              </h1>
              <p className={`${typographyBody} mx-auto max-w-2xl text-lg`}>
                IPVerse is a decentralized platform where creators can mint and
                monetize their intellectual property (IP) as NFTs. Gain control
                over your creations and connect with your audience through
                exclusive, subscription-based content.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {/* <button
                  className={`${buttonPrimary} px-8 py-3 text-lg font-semibold`}
                  >
                  Explore
                  </button> */}
                <Link href="/signin">
                  <button
                    className={`${buttonPrimary} px-8 py-3 text-lg font-semibold  cursor-pointer`}
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 max-w-3xl text-center md:text-left">
                <h2 className={`$${typographyH1} text-white`}>Key Features</h2>
                <p className={`${typographyBody}`}>
                  IPVerse empowers creators with tools to manage and monetize
                  their IP effectively.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="card transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="mb-4 text-ipv-primary">
                    <svg
                      fill="currentColor"
                      height="32px"
                      viewBox="0 0 256 256"
                      width="32px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Mint Your IP
                  </h3>
                  <p className={`${typographyBody}`}>
                    Transform your ideas into unique, verifiable NFTs, securing
                    your ownership and control.
                  </p>
                </div>
                <div className="card transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="mb-4 text-ipv-primary">
                    <svg
                      fill="currentColor"
                      height="32px"
                      viewBox="0 0 256 256"
                      width="32px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24A28,28,0,0,1,168,148Z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Monetize Content
                  </h3>
                  <p className={`${typographyBody}`}>
                    Offer exclusive content and experiences through
                    subscription-based access, directly rewarding your
                    creativity.
                  </p>
                </div>
                <div className="card transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="mb-4 text-ipv-primary">
                    <svg
                      fill="currentColor"
                      height="32px"
                      viewBox="0 0 256 256"
                      width="32px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Engage Your Community
                  </h3>
                  <p className={`${typographyBody}`}>
                    Build a loyal community by providing unique value and
                    fostering direct connections with your audience.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-cardBg py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className={`${typographyH2} text-white`}>
                Ready to Take Control of Your IP?
              </h2>
              <p className={`${typographyBody} mx-auto max-w-2xl`}>
                Join IPVerse today and start your journey towards decentralized
                content creation and monetization.
              </p>
              <div className="mt-8">
                <Link href="/signin">
                  <button
                    className={`${buttonPrimary} px-10 py-4 text-xl font-bold`}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
