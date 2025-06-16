'use client';

import React from "react";
import NavLink from "@/components/common/nav-link";
import { FileText } from "lucide-react";

const Header = () => {
  const isLoggedIn = false;

  return (
    <nav className="container grid grid-cols-3 items-center py-2 lg:px-8 px-2 mx-auto">
      {/* Left - Logo */}
      <div className="flex items-center space-x-4">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <span className="flex items-center space-x-1">
            <FileText className="w-5 h-5 lg:w-8 lg:h-8 relative top-[1px] text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
            <span className="font-bold lg:text-xl text-gray-900">Summarion</span>
          </span>
        </NavLink>
      </div>

      {/* Center - Pricing */}
      <div className="flex justify-center">
        <NavLink href="/pricing">Pricing</NavLink>
        {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
      </div>

      {/* Right - Auth Buttons */}
      <div className="flex justify-end gap-4">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            {/* <Button>User</Button> */}
          </div>
        ) : (
          <NavLink href="/sign-in">Sign In</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
