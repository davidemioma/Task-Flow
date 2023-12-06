"use server";

import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { StripeRedirect } from "./schema";
import { revalidatePath } from "next/cache";
import { getAbsoluteUrl } from "@/lib/utils";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { checkSubscription } from "@/lib/check-subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  const user = await currentUser();

  if (!user || !userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const billingUrl = getAbsoluteUrl(`/organization/${orgId}`);

  let url;

  try {
    const isSubscribed = await checkSubscription();

    const orgSubscription = await prismadb.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId && isSubscribed) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: billingUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        mode: "subscription",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Taskify Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (err) {
    return { error: "Failed to upgrade account." };
  }

  revalidatePath(`/organization/${orgId}`);

  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
