"use client";

import React from "react";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { deleteBoard } from "@/actions/deleteBoard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

interface Props {
  id: string;
}

const BoardOptions = ({ id }: Props) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (err) => {
      toast.error(err);
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm text-center text-neutral-600 font-medium pb-4">
          Board actions
        </div>

        <PopoverClose asChild>
          <Button
            className="absolute top-2 right-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          className="w-full h-auto py-2 px-5 justify-start text-sm font-normal rounded-none"
          variant="ghost"
          disabled={isLoading}
          onClick={() => execute({ id })}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
