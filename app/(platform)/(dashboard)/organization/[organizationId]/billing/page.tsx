import { Info } from "../_components/Info";
import SubButton from "./_components/SubButton";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/check-subscription";

export default async function BillingPage() {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />

      <Separator className="my-2" />

      <SubButton isPro={isPro} />
    </div>
  );
}
