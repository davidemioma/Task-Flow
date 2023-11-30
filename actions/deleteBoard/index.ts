"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const { id } = data;

  const exists = await prismadb.board.findUnique({
    where: {
      id,
      orgId,
    },
  });

  if (!exists) {
    return { error: "Board does not exists" };
  }

  let board;

  try {
    board = await prismadb.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (err) {
    return { error: "Failed to delete board." };
  }

  revalidatePath(`/organization/${orgId}`);

  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
