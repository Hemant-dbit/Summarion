import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500"
    >
      {children}
    </Link>
  );
};

export default NavLink;
