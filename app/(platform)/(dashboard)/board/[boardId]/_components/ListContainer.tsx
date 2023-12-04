"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { Card, List } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/updateListOrder";
import { updateCardOrder } from "@/actions/updateCardOrder";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

type ListProps = List & {
  cards: Card[];
};

interface Props {
  boardId: string;
  lists: ListProps[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ boardId, lists }: Props) => {
  const [orderedLists, setOrderedLists] = useState(lists);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List Re-ordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card Re-ordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    //if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list and type is list
    if (type === "list") {
      const items = reorder(orderedLists, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedLists(items);

      //Update backend
      executeUpdateListOrder({ boardId, items });
    }

    // User moves a card on the same list and type is card
    if (type === "card") {
      let newOrderedData = [...orderedLists];

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destinationList
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedLists(newOrderedData);

        //Update backend
        executeUpdateCardOrder({ boardId, items: reorderedCards });
      }
      // User moves the card to another list
      else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card in the destination list
        destinationList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedLists(newOrderedData);

        //Update backend
        executeUpdateCardOrder({ boardId, items: destinationList.cards });
      }
    }
  };

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            className="h-full flex gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {orderedLists.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}

            {provided.placeholder}

            <ListForm />

            <div className="w-1 h-6 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
