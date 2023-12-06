"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { CreateList } from "./schema";
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

  const { title, boardId } = data;

  let list;

  try {
    const boardExists = await prismadb.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!boardExists) {
      return { error: "Board does not exists" };
    }

    //Get the last list of the board
    const lastList = await prismadb.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    //Set the order of the new board
    const newOrder = lastList ? lastList.order + 1 : 0;

    list = await prismadb.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });

    await createActivityLog({
      action: ACTION.CREATE,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
    });
  } catch (err) {
    return { error: "Failed to create list." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
