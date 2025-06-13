import React from "react";
import NavLink from "@/components/common/nav-link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const isLoggedIn = false;

  return (
    <nav className="container flex items-center justify-between py-2 lg:px-8 px-2 mx-auto">
      <div className="flex items-center space-x-4">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform tranition duration-200 ease-in-out" />
          <span className="font-bold lg:text-xl  text-gray-900">Summarion</span>
        </NavLink>
      </div>

      <div className="flex gap-4 lg:justify-center lg:items-center lg:gap-12 ">
        <NavLink href="/#pricing">Pricing</NavLink>
        {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>User</Button>
          </div>
        ) : (
          <div>
            <NavLink href="/#sign-in">Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
