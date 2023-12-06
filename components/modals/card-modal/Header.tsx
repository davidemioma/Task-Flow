"use client";

import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { Layout } from "lucide-react";
import { Card, List } from "@prisma/client";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/updateCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { FormInput } from "@/components/form/FormInput";

type CardData = Card & {
  list: List;
};

export const Header = ({ data }: { data: CardData }) => {
  const params = useParams();

  const queryClient = useQueryClient();

  const [title, setTitle] = useState(data.title);

  const inputRef = useRef<ElementRef<"input">>(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Renamed to "${data.title}"`);

      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const boardId = params.boardId as string;

    const title = formData.get("title") as string;

    if (title === data.title) return;

    execute({
      id: data.id,
      boardId,
      title,
    });
  };

  return (
    <div className="w-full flex items-start gap-3 mb-6">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />

      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
            id="title"
            ref={inputRef}
            defaultValue={title}
            onBlur={onBlur}
          />
        </form>

        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-3 mb-6">
      <Skeleton className="bg-neutral-200 h-6 w-6 mt-1" />

      <div>
        <Skeleton className="bg-neutral-200 w-24 h-6 mb-1" />

        <Skeleton className="bg-neutral-200 w-12 h-4" />
      </div>
    </div>
  );
};
