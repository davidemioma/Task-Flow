"use client";

import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { Board } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { updateBoard } from "@/actions/updateBoard";
import { FormInput } from "@/components/form/FormInput";

interface Props {
  board: Board;
}

const BoardTitleForm = ({ board }: Props) => {
  const [title, setTitle] = useState(board.title);

  const formRef = useRef<ElementRef<"form">>(null);

  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();

      inputRef.current?.select();
    });
  };

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);

      setTitle(data.title);

      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      id: board.id,
      title,
    });
  };

  //This is to trigger the onSubmit().
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form className="flex items-center gap-2" ref={formRef} action={onSubmit}>
        <FormInput
          className="bg-transparent h-7 px-[7px] py-1 text-lg font-bold"
          id="title"
          ref={inputRef}
          defaultValue={title}
          onBlur={onBlur}
        />
      </form>
    );
  }

  return (
    <Button
      className="h-auto w-auto p-1 px-2 font-bold text-lg border-none focus-visible:outline-none focus-visible:ring-transparent"
      variant="transparent"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
