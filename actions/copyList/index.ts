"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { CopyList } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id, boardId } = data;

  let list;

  try {
    const listToCopy = await prismadb.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "List not found!" };
    }

    const lastList = await prismadb.list.findFirst({
      where: {
        boardId,
        board: {
          orgId,
        },
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 0;

    if (listToCopy.cards.length > 0) {
      list = await prismadb.list.create({
        data: {
          boardId: listToCopy.boardId,
          title: `${listToCopy.title} - Copy`,
          order: newOrder,
          cards: {
            createMany: {
              data: listToCopy?.cards?.map((card) => ({
                title: card.title,
                order: card.order,
                description: card.description,
              })),
            },
          },
        },
        include: {
          cards: true,
        },
      });
    } else {
      list = await prismadb.list.create({
        data: {
          boardId: listToCopy.boardId,
          title: `${listToCopy.title} - Copy`,
          order: newOrder,
        },
        include: {
          cards: true,
        },
      });
    }
  } catch (err) {
    return { error: "Failed to copy list." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
