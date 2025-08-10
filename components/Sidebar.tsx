import React from "react";
import SidebarNavLink from "./SidebarNavLink";
import { getLoggedInUserTwitter } from "@/lib/utils";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-ipv-background border-r border-r-cardBg p-4 hidden lg:flex flex-col justify-between">
      {/* Logo Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="size-8">
            <svg
              className="text-ipv-primary"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold">IPVerse</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <SidebarNavLink
            href="/explore"
            label="Explore"
            icon={
              <svg
                fill="currentColor"
                height="24"
                viewBox="0 0 256 256"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"></path>
              </svg>
            }
          />
          <SidebarNavLink
            href="/create"
            label="Create"
            icon={
              <svg
                fill="currentColor"
                height="24"
                viewBox="0 0 256 256"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
            }
          />
          <SidebarNavLink
            href="/analytics"
            label="Analytics"
            icon={
              <svg
                fill="currentColor"
                height="24"
                viewBox="0 0 256 256"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,144a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
              </svg>
            }
          />
        </nav>
      </div>

      {/* Footer Profile */}
      <div className="flex items-center gap-3 border-t border-t-cardBg p-2">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: `url('https://unavatar.io/x/${getLoggedInUserTwitter()}')`,
          }}
        ></div>
        <div>
          <h3 className="font-semibold">@{getLoggedInUserTwitter()}</h3>
          <p className="text-sm text-textSecondary">Creator</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
