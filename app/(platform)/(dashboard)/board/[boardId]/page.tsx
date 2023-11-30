import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import ListContainer from "./_components/ListContainer";

export default async function BoardPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();

  const { boardId } = params;

  if (!orgId) {
    return redirect("/select-org");
  }

  const lists = await prismadb.list.findMany({
    where: {
      board: {
        orgId,
      },
      boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="h-full p-4 overflow-x-auto scrollbar-hide">
      <ListContainer boardId={boardId} lists={lists} />
    </div>
  );
}
