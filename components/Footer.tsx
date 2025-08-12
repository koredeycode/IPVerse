import Image from "next/image";
import Link from "next/link";
import { typographyBody } from "./styles";

const Footer = () => {
  return (
    <footer className="bg-black/20 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <div className={`${typographyBody} mb-2`}>
              <p>© {new Date().getFullYear()} IPVerse</p>
              <p className="text-sm">All rights reserved</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center md:justify-start">
              <Link className={`${typographyBody} hover:text-white`} href="#">
                Terms of Service
              </Link>
              <Link className={`${typographyBody} hover:text-white`} href="#">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="bg-cardBg p-4 flex gap-2 items-center rounded">
            <Image
              alt="camp logo"
              src={"/camp.svg"}
              width={10}
              height={10}
              className="h-8 w-8"
            />
            <p className={`${typographyBody} text-center md:text-right`}>
              Powered by Camp Network
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
