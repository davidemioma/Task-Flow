import prismadb from "./prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
  action: ACTION;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
}

export const createActivityLog = async ({
  action,
  entityId,
  entityType,
  entityTitle,
}: Props) => {
  try {
    const { orgId } = auth();

    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    await prismadb.activityLog.create({
      data: {
        orgId,
        action,
        entityId,
        entityType,
        entityTitle,
        userId: user.id,
        userImage: user.imageUrl,
        username: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (err: any) {
    throw new Error("Unable to create activity log", err.message);
  }
};
