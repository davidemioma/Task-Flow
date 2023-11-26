"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import useMobileSidebar from "@/hooks/use-mobile-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const MobileSidebar = () => {
  const pathname = usePathname();

  const mobileSidebar = useMobileSidebar();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    mobileSidebar.onClose();
  }, [pathname, mobileSidebar.onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
        onClick={() => mobileSidebar.onOpen()}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <Sheet open={mobileSidebar.isOpen} onOpenChange={mobileSidebar.onClose}>
        <SheetContent className="p-2 pt-10" side="left">
          <Sidebar storageKey="t-mobile-sidebar-key" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
