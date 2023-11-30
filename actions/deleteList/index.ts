"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { DeleteList } from "./schema";
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
    list = await prismadb.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (err) {
    return { error: "Failed to delete list." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
