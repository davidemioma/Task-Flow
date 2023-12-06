import React from "react";
import { format } from "date-fns";
import { ActivityLog } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";

interface Props {
  activity: ActivityLog;
}

const ActivityItem = ({ activity }: Props) => {
  return (
    <li className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={activity.userImage} />
      </Avatar>

      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="text-neutral-700 font-semibold lowercase">
            {activity.username}
          </span>{" "}
          {generateLogMessage(activity)}
        </p>

        <p className="text-xs text-muted-foreground">
          {format(new Date(activity.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
