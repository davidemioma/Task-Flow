"use clent";

import React from "react";
import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";
import { Card, List } from "@prisma/client";
import { useParams } from "next/navigation";
import { copyCard } from "@/actions/copyCard";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/deleteCard";
import useCardModel from "@/hooks/use-card-model";
import { Skeleton } from "@/components/ui/skeleton";

type CardData = Card & {
  list: List;
};

export const Actions = ({ data }: { data: CardData }) => {
  const params = useParams();

  const cardModal = useCardModel();

  const { execute: executeCopyCard, isLoading: copyLoading } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);

        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: deleteLoading } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);

        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>

      <Button
        className="w-full justify-start"
        size="inline"
        variant="gray"
        onClick={onCopy}
        disabled={copyLoading}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>

      <Button
        className="w-full justify-start"
        size="inline"
        variant="gray"
        onClick={onDelete}
        disabled={deleteLoading}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="bg-neutral-200 w-20 h-4" />

      <Skeleton className="bg-neutral-200 w-full h-8" />

      <Skeleton className="bg-neutral-200 w-full h-8" />
    </div>
  );
};
