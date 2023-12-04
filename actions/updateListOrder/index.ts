"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { UpdateListOrder } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { boardId, items } = data;

  let lists;

  try {
    const transaction = items.map((list) => {
      return prismadb.list.update({
        where: {
          board: {
            orgId,
          },
          boardId,
          id: list.id,
        },
        data: {
          order: list.order,
        },
      });
    });

    lists = await prismadb.$transaction(transaction);
  } catch (err) {
    return { error: "Failed to update list order." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
