import Link from "next/link";
import { typographyBody } from "./styles";

const Footer = () => {
  return (
    <footer className="bg-black/20 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center md:justify-start">
            {/* <a className={`${typographyBody} hover:text-white`} href="#">
              About
            </a>
            <a className={`${typographyBody} hover:text-white`} href="#">
              Contact
            </a> */}
            <Link className={`${typographyBody} hover:text-white`} href="#">
              Terms of Service
            </Link>
            <Link className={`${typographyBody} hover:text-white`} href="#">
              Privacy Policy
            </Link>
          </div>
          <p className={`${typographyBody} text-center md:text-right`}>
            © 2025 IPVerse. All rights reserved.
          </p>
          <p className={`${typographyBody} text-center md:text-right`}>
            Powered by camp network
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
