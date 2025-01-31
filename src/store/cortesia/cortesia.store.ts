import { create } from "zustand";
import { Cortesia } from "../../types/cortesia-transaction";

interface State {
    cortesia: Cortesia | null;
    setCortesia: (cortesia: Cortesia | null ) => void;
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
}

export const useCortesia = create<State>((set) => ({
    cortesia: null,
    setCortesia: (cortesia: Cortesia | null ) => set({ cortesia }),
    openModal: false,
    setOpenModal: (openModal: boolean) => set({ openModal }),
}));