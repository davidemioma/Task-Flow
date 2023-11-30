"use client";

import React, { useState } from "react";
import ListHeader from "./ListHeader";
import { List, Card } from "@prisma/client";

type ListProps = List & {
  cards: Card[];
};

interface Props {
  index: number;
  list: ListProps;
}

const ListItem = ({ index, list }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="bg-[#f1f2f4] w-full pb-2 rounded-md shadow-md">
        <ListHeader list={list} onAddCard={() => {}} />
      </div>
    </li>
  );
};

export default ListItem;
