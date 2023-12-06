import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { cardId } = params;

    if (!cardId) {
      return new NextResponse("Card ID required", { status: 400 });
    }

    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const activityLogs = await prismadb.activityLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(activityLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
