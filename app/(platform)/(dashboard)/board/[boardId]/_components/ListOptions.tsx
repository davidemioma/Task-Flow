"use client";

import React, { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { List, Card } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { copyList } from "@/actions/copyList";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { deleteList } from "@/actions/deleteList";
import FormSubmit from "@/components/form/FormSubmit";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ListProps = List & {
  cards: Card[];
};

interface Props {
  list: ListProps;
  onAddCard: () => void;
}

const ListOptions = ({ list, onAddCard }: Props) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);

      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);

      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;

    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;

    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm text-center text-neutral-600 font-medium pb-4">
          List actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          className="w-full h-auto p-2 px-5 font-normal text-sm justify-start rounded-none"
          variant="ghost"
          onClick={onAddCard}
        >
          Add card...
        </Button>

        <form action={onCopy}>
          <input hidden name="id" id="id" value={list.id} />

          <input hidden name="boardId" id="boardId" value={list.boardId} />

          <FormSubmit
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm rounded-none"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>

        <Separator />

        <form action={onDelete}>
          <input hidden name="id" id="id" value={list.id} />

          <input hidden name="boardId" id="boardId" value={list.boardId} />

          <FormSubmit
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm rounded-none"
            variant="ghost"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
