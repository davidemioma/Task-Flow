import { Suspense } from "react";
import { Info } from "./_components/Info";
import { BoardList } from "./_components/BoardList";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/check-subscription";

export default async function OrganizationPage() {
  const isPro = await checkSubscription();

  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />

      <Separator className="my-4" />

      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          {/* @ts-ignore */}
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}
