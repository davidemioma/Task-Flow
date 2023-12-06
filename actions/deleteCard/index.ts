"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { DeleteCard } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createSafeAction } from "@/lib/create-safe-action";
import { createActivityLog } from "@/lib/create-activity-log";

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

    await createActivityLog({
      action: ACTION.DELETE,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
    });
  } catch (err) {
    return { error: "Failed to delete Card." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
