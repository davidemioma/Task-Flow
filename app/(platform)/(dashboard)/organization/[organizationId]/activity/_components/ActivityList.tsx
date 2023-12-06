import React from "react";
import { ActivityLog } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/ActivityItem";

interface Props {
  activityLogs: ActivityLog[];
}

export const ActivityList = ({ activityLogs }: Props) => {
  return (
    <ol className="mt-4 space-y-4 pb-10">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>

      {activityLogs.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="w-[80%] h-14" />

      <Skeleton className="w-[50%] h-14" />

      <Skeleton className="w-[70%] h-14" />

      <Skeleton className="w-[80%] h-14" />

      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};
