import { ACTION, ActivityLog } from "@prisma/client";

export const generateLogMessage = (activity: ActivityLog) => {
  const { action, entityTitle, entityType } = activity;

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
