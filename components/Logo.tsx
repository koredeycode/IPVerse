import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Image width={120} height={20} alt="app logo" src="/logo.png" />
      {/* <h1 className="text-2xl font-bold text-ipv-primary">IPVerse</h1> */}
    </div>
  );
};

export default Logo;
