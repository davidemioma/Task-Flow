"use client";

import React from "react";
import { Header } from "./Header";
import { fetcher } from "@/lib/utils";
import { Card, List } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import useCardModel from "@/hooks/use-card-model";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type CardProps = Card & {
  list: List;
};

const CardModal = () => {
  const cardModal = useCardModel();

  const { data: cardData } = useQuery<CardProps>({
    queryKey: ["card", cardModal.cardId],
    queryFn: () => fetcher(`/api/card/${cardModal.cardId}`),
  });

  return (
    <Dialog open={cardModal.isOpen} onOpenChange={cardModal.onClose}>
      <DialogContent>
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
