"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarNavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  href,
  icon,
  label,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-ipv-accent text-white"
          : "hover:bg-cardBg text-textPrimary"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default SidebarNavLink;
