"use client";

import React from "react";
import { ActivityIcon } from "lucide-react";
import { ActivityLog } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/ActivityItem";

interface Props {
  data: ActivityLog[];
}

export const Activities = ({ data }: Props) => {
  return (
    <div className="w-full flex items-start gap-3">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />

      <div className="w-full space-y-4">
        <p className="text-neutral-700 font-semibold">Activity</p>

        <ol className="space-y-4">
          {data.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activities.Skeleton = function ActivitySkeleton() {
  return (
    <div className="w-full flex items-start gap-3">
      <Skeleton className="bg-neutral-200 h-6 w-6" />

      <div className="w-full">
        <Skeleton className="bg-neutral-200 w-24 h-6 mb-2" />

        <Skeleton className="bg-neutral-200 w-full h-10" />
      </div>
    </div>
  );
};
