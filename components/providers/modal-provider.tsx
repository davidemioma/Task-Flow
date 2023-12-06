"use client";

import { useEffect, useState } from "react";
import ProModal from "../modals/ProModal";
import CardModal from "../modals/card-modal/Index";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />

      <ProModal />
    </>
  );
};
