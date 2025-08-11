import Logo from "./Logo";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-ipv-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center whitespace-nowrap border-b border-solid border-white/10 py-4">
          <div className="flex items-center gap-3 text-white">
            <Logo />
          </div>
          {/* <div className="flex items-center gap-4">
            <button className={`${buttonPrimary}`}>
              <span className="truncate">Connect Wallet</span>
            </button>
            <button className="flex items-center justify-center rounded-full p-2 hover:bg-white/10 transition-colors">
              <div
                className="text-white"
                data-icon="Sun"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  fill="currentColor"
                  height="24px"
                  viewBox="0 0 256 256"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                </svg>
              </div>
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
