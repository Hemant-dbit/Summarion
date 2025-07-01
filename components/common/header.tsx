"use client";

import React from "react";
import NavLink from "@/components/common/nav-link";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const isLoggedIn = false;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-white/10 text-black shadow backdrop-blur-md border-b border-gray-200"
          : "bg-transparent text-gray-900"
      } grid grid-cols-3 items-center px-6 py-3`}
    >
      {/* Left - Logo */}
      <div className="flex items-center space-x-4">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <span className="flex items-center space-x-1">
            <FileText className="w-5 h-5 lg:w-8 lg:h-8 relative top-[1px] text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
            <span className="font-bold lg:text-xl text-gray-900">
              Summarion
            </span>
          </span>
        </NavLink>
      </div>

      {/* Center - Pricing */}
      <div className="flex justify-center ">
        <NavLink
          href="/pricing"
          className="text-m md:text-base lg:text-lg space-x-4"
        >
          Pricing
        </NavLink>
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
          <NavLink
            href="/sign-in"
            className="text-m md:text-base lg:text-lg space-x-4"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
