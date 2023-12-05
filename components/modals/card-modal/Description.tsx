"use client";

import React, { useState, useRef, ElementRef } from "react";
import { toast } from "sonner";
import { AlignLeft } from "lucide-react";
import { Card, List } from "@prisma/client";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { updateCard } from "@/actions/updateCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import FormSubmit from "@/components/form/FormSubmit";
import { FormTextarea } from "@/components/form/FormTextarea";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type CardData = Card & {
  list: List;
};

export const Description = ({ data }: { data: CardData }) => {
  const params = useParams();

  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);

  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);

  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      toast.success(`Card "${data.title}" updated`);

      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const boardId = params.boardId as string;

    const description = formData.get("description") as string;

    execute({
      id: data.id,
      boardId,
      description,
    });
  };

  return (
    <div className="w-full flex items-start gap-3">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />

      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>

        {editing ? (
          <form className="space-y-2" ref={formRef} action={onSubmit}>
            <FormTextarea
              className="w-full mt-2"
              id="description"
              ref={textareaRef}
              errors={fieldErrors}
              placeholder="Add a more detailed description"
              defaultValue={data.description || undefined}
            />

            <div className="flex items-center gap-2">
              <FormSubmit>Save</FormSubmit>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            className="bg-neutral-200 min-h-[78px] px-3.5 py-3 text-sm font-medium rounded-md"
            role="button"
            onClick={enableEditing}
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className=" w-full flex items-start gap-3">
      <Skeleton className="bg-neutral-200 h-6 w-6" />

      <div className="w-full">
        <Skeleton className="bg-neutral-200 w-24 h-6 mb-2 " />

        <Skeleton className="bg-neutral-200 w-full h-[78px] " />
      </div>
    </div>
  );
};
