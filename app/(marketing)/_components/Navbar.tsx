import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="fixed top-0 bg-white w-full h-14 flex items-center px-4 border-b shadow-sm">
      <div className="w-full md:max-w-screen-2xl mx-auto flex items-center justify-between">
        <Logo />

        <div className="w-full md:block md:w-auto flex items-center justify-between space-x-4">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>

          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
