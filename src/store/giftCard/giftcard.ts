import { create } from "zustand";
import { GiftCardTransaction } from "../../types/gift-card";

interface State {
    transactions: GiftCardTransaction[];
    setTransactions: (transactions: GiftCardTransaction[]) => void;
    transactionsEmployee: GiftCardTransaction[];
    setTransactionsEmployee: (transactions: GiftCardTransaction[]) => void;
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    openModalEmployee: boolean;
    setOpenModalEmployee: (openModal: boolean) => void;
}

export const useGiftCardStore = create<State>((set) => ({
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
    transactionsEmployee: [],
    setTransactionsEmployee: (transactionsEmployee) => set({ transactionsEmployee }),
    openModal: false,
    setOpenModal: (openModal) => set({ openModal}),
    openModalEmployee: false,
    setOpenModalEmployee: (openModalEmployee) => set({ openModalEmployee})
}))
