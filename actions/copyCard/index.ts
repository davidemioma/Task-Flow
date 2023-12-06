"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { CopyCard } from "./schema";
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
    const cardToCopy = await prismadb.card.findUnique({
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

    if (!cardToCopy) {
      return { error: "Card not found!" };
    }

    const lastCard = await prismadb.card.findFirst({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await prismadb.card.create({
      data: {
        listId: cardToCopy.listId,
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
      },
    });

    await createActivityLog({
      action: ACTION.CREATE,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
    });
  } catch (err) {
    return { error: "Failed to copy card." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
