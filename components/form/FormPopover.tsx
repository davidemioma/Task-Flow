"use client";

import React, { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import FormSubmit from "./FormSubmit";
import FormPicker from "./FormPicker";
import { FormInput } from "./FormInput";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import useProModel from "@/hooks/use-pro-model";
import { createBoard } from "@/actions/createBoard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

interface Props {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: Props) => {
  const router = useRouter();

  const proModal = useProModel();

  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created!");

      closeRef.current?.click();

      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);

      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        className="w-80 pt-3"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-sm text-center text-neutral-600 font-medium">
          Create board
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />

            <FormInput
              type="text"
              id="title"
              label="Board title"
              errors={fieldErrors}
            />
          </div>

          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
