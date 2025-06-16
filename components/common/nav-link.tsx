'use client';

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === href || pathName.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200 text-gray-600 hover:text-blue-500",
        isActive && "text-blue-500 font-semibold",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
