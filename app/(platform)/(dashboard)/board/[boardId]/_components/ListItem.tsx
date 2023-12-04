"use client";

import React, { ElementRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { CardForm } from "./CardForm";
import ListHeader from "./ListHeader";
import { List, Card } from "@prisma/client";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type ListProps = List & {
  cards: Card[];
};

interface Props {
  index: number;
  list: ListProps;
}

const ListItem = ({ index, list }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          className="h-full w-[272px] shrink-0 select-none"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="bg-[#f1f2f4] w-full pb-2 rounded-md shadow-md"
            {...provided.dragHandleProps}
          >
            <ListHeader list={list} onAddCard={enableEditing} />

            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  className={cn(
                    "flex flex-col gap-2 mx-1 px-1 py-0.5",
                    list.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {list.cards.map((card, index) => (
                    <CardItem key={card.id} card={card} index={index} />
                  ))}

                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm
              listId={list.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
