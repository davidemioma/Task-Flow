import React from "react";
import { Card, List } from "@prisma/client";
import ListForm from "./ListForm";

type ListProps = List & {
  cards: Card[];
};

interface Props {
  boardId: string;
  lists: ListProps[];
}

const ListContainer = ({ boardId, lists }: Props) => {
  return (
    <ol>
      <ListForm />

      <div className="w-1 h-6 flex-shrink-0" />
    </ol>
  );
};

export default ListContainer;
