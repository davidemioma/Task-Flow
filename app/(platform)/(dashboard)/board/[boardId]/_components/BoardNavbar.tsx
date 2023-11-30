import React from "react";
import { Board } from "@prisma/client";
import BoardOptions from "./BoardOptions";
import BoardTitleForm from "./BoardTitleForm";

interface Props {
  board: Board;
}

const BoardNavbar = ({ board }: Props) => {
  return (
    <div className="bg-black/50 fixed top-14 z-[40] w-full h-14 flex items-center gap-4 px-6 text-white">
      <BoardTitleForm board={board} />

      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
