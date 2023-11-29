import React from "react";
import { Plus } from "lucide-react";
import Logo from "@/components/Logo";
import MobileSidebar from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import FormPopover from "@/components/form/FormPopover";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 bg-white w-full h-14 flex items-center px-4 border-b shadow-sm">
      <MobileSidebar />

      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <Logo />
        </div>

        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            className="hidden md:block h-auto py-1.5 px-2 rounded-sm"
            variant="primary"
            size="sm"
          >
            Create
          </Button>
        </FormPopover>

        <FormPopover>
          <Button
            className="block md:hidden rounded-sm"
            variant="primary"
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <OrganizationSwitcher
          hidePersonal
          afterLeaveOrganizationUrl="/select-org"
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
