import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import Hint from "@/components/Hint";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { MAX_FREE_BOARDS } from "@/lib/utils";
import { User2, HelpCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvailableCount } from "@/lib/org-limit";
import FormPopover from "@/components/form/FormPopover";
import { checkSubscription } from "@/lib/check-subscription";

export const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const availableCount = await getAvailableCount();

  const isPro = await checkSubscription();

  const boards = await prismadb.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg text-neutral-700 font-semibold">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            className="group relative bg-no-repeat bg-center bg-cover bg-sky-700 aspect-video h-full w-full p-2 rounded-sm overflow-hidden"
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

            <p className="relative text-white font-semibold">{board.title}</p>
          </Link>
        ))}

        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="bg-muted relative w-full h-full aspect-video flex flex-col items-center justify-center gap-1 rounded-sm hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>

            <span className="text-xs">
              {isPro ? "Unlimited" : `${MAX_FREE_BOARDS - availableCount}`}{" "}
              remaining
            </span>

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
