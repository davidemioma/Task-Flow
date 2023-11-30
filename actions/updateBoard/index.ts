"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { UpdateBoard } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { title, id } = data;

  let board;

  try {
    const exists = await prismadb.board.findUnique({
      where: {
        id,
        orgId,
      },
    });

    if (!exists) {
      return { error: "Board does not exists" };
    }

    board = await prismadb.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (err) {
    return { error: "Failed to update board." };
  }

  revalidatePath(`/board/${board.id}`);

  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
