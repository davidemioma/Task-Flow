"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { UpdateCardOrder } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { boardId, items } = data;

  let cards;

  try {
    const transaction = items.map((card) => {
      return prismadb.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
            boardId,
          },
        },
        data: {
          listId: card.listId,
          order: card.order,
        },
      });
    });

    cards = await prismadb.$transaction(transaction);
  } catch (err) {
    console.log(err);
    return { error: "Failed to update card order." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: cards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
