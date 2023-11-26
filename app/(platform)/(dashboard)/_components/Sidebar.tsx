"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Organization, NavItem } from "./NavItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

interface Props {
  storageKey?: string;
}

const Sidebar = ({ storageKey = "t-sidebar-key" }: Props) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  //Get Active Organisation from Clerk
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  //Get all Organizations from Clerk
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-1/2" />

          <Skeleton className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <NavItem.Skeleton />

          <NavItem.Skeleton />

          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center mb-1 text-sm font-medium">
        <span className="pl-4">Workspaces</span>

        <Button
          className="ml-auto"
          asChild
          type="button"
          size="icon"
          variant="ghost"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        className="space-y-2"
        type="multiple"
        defaultValue={defaultAccordionValue}
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            organization={organization as Organization}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
