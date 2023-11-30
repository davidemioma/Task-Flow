"use client";

import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import ListOptions from "./ListOptions";
import { List, Card } from "@prisma/client";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/updateList";
import { FormInput } from "@/components/form/FormInput";

type ListProps = List & {
  cards: Card[];
};

interface Props {
  list: ListProps;
  onAddCard: () => void;
}

const ListHeader = ({ list, onAddCard }: Props) => {
  const [title, setTitle] = useState(list.title);

  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);

  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();

      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);

      setTitle(data.title);

      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const id = formData.get("id") as string;

    const boardId = formData.get("boardId") as string;

    const title = formData.get("title") as string;

    if (title === list.title) {
      return disableEditing();
    }

    execute({
      id,
      boardId,
      title,
    });
  };

  return (
    <div className="flex items-start justify-between gap-2 pt-2 px-2 text-sm font-semibold">
      {isEditing ? (
        <form className="flex-1 px-[2px]" ref={formRef} action={handleSubmit}>
          <input hidden id="id" name="id" value={list.id} />

          <input hidden id="boardId" name="boardId" value={list.boardId} />

          <FormInput
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            ref={inputRef}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            onBlur={onBlur}
          />

          <button type="submit" hidden />
        </form>
      ) : (
        <div
          className="w-full h-7 px-2.5 py-1 text-sm font-medium border-transparent"
          onClick={enableEditing}
        >
          {title}
        </div>
      )}

      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  );
};

export default ListHeader;
