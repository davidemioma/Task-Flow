"use client";

import React, {
  ElementRef,
  forwardRef,
  useRef,
  KeyboardEventHandler,
} from "react";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/createCard";
import FormSubmit from "@/components/form/FormSubmit";
import { FormTextarea } from "@/components/form/FormTextarea";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface Props {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();

    const formRef = useRef<ElementRef<"form">>(null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useEventListener("keydown", onKeyDown);

    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);

        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onSubmit = (formData: FormData) => {
      const boardId = params.boardId as string;

      const title = formData.get("title") as string;

      const listId = formData.get("listId") as string;

      execute({ boardId, title, listId });
    };

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        formRef.current?.requestSubmit();
      }
    };

    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4"
          ref={formRef}
          action={onSubmit}
        >
          <FormTextarea
            id="title"
            ref={ref}
            errors={fieldErrors}
            placeholder="Enter a title for this card..."
            onKeyDown={onTextareakeyDown}
          />

          <input hidden id="listId" name="listId" value={listId} />

          <div className="flex items-center gap-1">
            <FormSubmit>Add card</FormSubmit>

            <Button size="sm" variant="ghost" onClick={disableEditing}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          className="h-auto w-full px-2 py-1.5 justify-start text-sm text-muted-foreground"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
