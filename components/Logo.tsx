import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden md:flex items-center gap-2 hover:opacity-75 transition">
        <Image src="/logo.png" width={30} height={30} alt="Logo" />

        <span
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        >
          TaskFlow
        </span>
      </div>
    </Link>
  );
};

export default Logo;
