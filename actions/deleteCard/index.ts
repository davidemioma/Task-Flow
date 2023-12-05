"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { DeleteCard } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id, boardId } = data;

  let card;

  try {
    card = await prismadb.card.delete({
      where: {
        id,
        list: {
          boardId,
          board: {
            orgId,
          },
        },
      },
    });
  } catch (err) {
    return { error: "Failed to delete Card." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
