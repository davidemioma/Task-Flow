import React from "react";
import Hint from "@/components/Hint";
import { User2, HelpCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import FormPopover from "@/components/form/FormPopover";

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg text-neutral-700 font-semibold">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Render Boards */}

        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="bg-muted relative w-full h-full aspect-video flex flex-col items-center justify-center gap-1 rounded-sm hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>

            <span className="text-xs">5 remaining</span>

            <Hint
              sideOffset={40}
              description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="h-full w-full aspect-video p-2" />

      <Skeleton className="h-full w-full aspect-video p-2" />

      <Skeleton className="h-full w-full aspect-video p-2" />

      <Skeleton className="h-full w-full aspect-video p-2" />

      <Skeleton className="h-full w-full aspect-video p-2" />

      <Skeleton className="h-full w-full aspect-video p-2" />

      <Skeleton className="h-full w-full aspect-video p-2" />

      <Skeleton className="h-full w-full aspect-video p-2" />
    </div>
  );
};
