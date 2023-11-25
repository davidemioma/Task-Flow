import React from "react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="bg-slate-100 fixed bottom-0 w-full p-4 border-t">
      <div className="w-full md:max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <span className="text-neutral-500 text-sm whitespace-nowrap order-2 sm:order-1">
          © 2023 David Emioma
        </span>

        <div className="flex items-center gap-2 sm:order-2">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>

          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
