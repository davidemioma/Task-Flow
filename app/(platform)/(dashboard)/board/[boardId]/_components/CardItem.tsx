"use client";

import React from "react";
import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import useCardModel from "@/hooks/use-card-model";

interface Props {
  card: Card;
  index: number;
}

const CardItem = ({ card, index }: Props) => {
  const cardModal = useCardModel();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="bg-white py-2 px-3 text-sm truncate rounded-md shadow-sm border-2 border-transparent hover:border-black"
          role="button"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => cardModal.onOpen(card.id)}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
