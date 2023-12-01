"use client";

import React from "react";
import { Card } from "@prisma/client";

interface Props {
  card: Card;
  index: number;
}

const CardItem = ({ card, index }: Props) => {
  return (
    <div className="bg-white py-2 px-3 text-sm truncate rounded-md shadow-sm cursor-pointer border-2 border-transparent hover:border-black">
      {card.title}
    </div>
  );
};

export default CardItem;
