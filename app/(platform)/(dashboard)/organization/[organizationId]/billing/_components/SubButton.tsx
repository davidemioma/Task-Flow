"use client";

import React from "react";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import useProModel from "@/hooks/use-pro-model";
import { Button } from "@/components/ui/button";
import { stripeRedirect } from "@/actions/stripeRedirect";

const SubButton = ({ isPro }: { isPro: boolean }) => {
  const proModal = useProModel();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };

  return (
    <Button variant="primary" disabled={isLoading} onClick={onClick}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};

export default SubButton;
