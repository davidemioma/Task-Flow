"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { CreateBoard } from "./schema";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { title, image } = data;

  let board;

  try {
    board = await prismadb.board.create({
      data: {
        title,
        orgId,
      },
    });
  } catch (err) {
    return { error: "Failed to create." };
  }

  revalidatePath(`/board/${board.id}`);

  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
