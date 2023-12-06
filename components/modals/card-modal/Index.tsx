"use client";

import React from "react";
import { Header } from "./Header";
import { Actions } from "./Actions";
import { fetcher } from "@/lib/utils";
import { Activities } from "./Activities";
import { Description } from "./Description";
import { useQuery } from "@tanstack/react-query";
import useCardModel from "@/hooks/use-card-model";
import { ActivityLog, Card, List } from "@prisma/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type CardProps = Card & {
  list: List;
};

type ActivityLogProps = ActivityLog;

const CardModal = () => {
  const cardModal = useCardModel();

  const { data: cardData } = useQuery<CardProps>({
    queryKey: ["card", cardModal.cardId],
    queryFn: () => fetcher(`/api/card/${cardModal.cardId}`),
  });

  const { data: activityLogsData } = useQuery<ActivityLogProps[]>({
    queryKey: ["card-logs", cardModal.cardId],
    queryFn: () => fetcher(`/api/card/${cardModal.cardId}/logs`),
  });

  return (
    <Dialog open={cardModal.isOpen} onOpenChange={cardModal.onClose}>
      <DialogContent>
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <Description data={cardData} />
              ) : (
                <Description.Skeleton />
              )}

              {activityLogsData ? (
                <Activities data={activityLogsData} />
              ) : (
                <Activities.Skeleton />
              )}
            </div>
          </div>

          {cardData ? <Actions data={cardData} /> : <Actions.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
