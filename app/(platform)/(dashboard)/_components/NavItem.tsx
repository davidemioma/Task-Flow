"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, usePathname } from "next/navigation";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Organization = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface Props {
  organization: Organization;
  isActive: boolean;
  isExpanded: boolean;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  organization,
  isActive,
  isExpanded,
  onExpand,
}: Props) => {
  const router = useRouter();

  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  return (
    <AccordionItem className="border-none" value={organization.id}>
      <AccordionTrigger
        className={cn(
          "flex items-center gap-2 p-1.5 text-neutral-700 text-start no-underline rounded-md hover:no-underline hover:bg-neutral-500/10 transition",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
        onClick={() => onExpand(organization.id)}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 overflow-hidden rounded-sm">
            <Image
              className="object-cover"
              src={organization.imageUrl}
              fill
              alt="Organization"
            />
          </div>

          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-2 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            className={cn(
              "w-full justify-start pl-10 mb-1 font-normal",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
            size="sm"
            onClick={() => router.push(route.href)}
          >
            {route.icon}

            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>

      <Skeleton className="h-10 w-full" />
    </div>
  );
};
