"use client";

import React, { useEffect, useState } from "react";
import ListForm from "./ListForm";
import { Card, List } from "@prisma/client";
import ListItem from "./ListItem";

type ListProps = List & {
  cards: Card[];
};

interface Props {
  boardId: string;
  lists: ListProps[];
}

const ListContainer = ({ boardId, lists }: Props) => {
  const [orderedLists, setOrderedLists] = useState(lists);

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  return (
    <ol className="h-full flex gap-4">
      {orderedLists.map((list, index) => (
        <ListItem key={list.id} index={index} list={list} />
      ))}
      <ListForm />

      <div className="w-1 h-6 flex-shrink-0" />
    </ol>
  );
};

export default ListContainer;
