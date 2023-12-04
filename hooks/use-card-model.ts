import { create } from "zustand";

interface Props {
  cardId?: string;
  isOpen: boolean;
  onOpen: (cardId: string) => void;
  onClose: () => void;
}

const useCardModel = create<Props>((set) => ({
  cardId: undefined,
  isOpen: false,
  onOpen: (cardId: string) => set({ isOpen: true, cardId }),
  onClose: () => set({ isOpen: false, cardId: undefined }),
}));

export default useCardModel;
