import { create } from "zustand";
import { Invoice, Refound } from "../../types";

interface State {
    isLoadingRefounds: boolean;
    setIsLoadingRefounds: (isLoading: boolean) => void;
    openModalRefournd: boolean;
    setOpenModalRefournd: (open: boolean) => void;
    refoundSelected: Refound | null;
    setRefoundSelected: (refound: Refound | null) => void;
    refounds: Refound[];
    setRefounds: (refounds: Refound[]) => void;
    inovices: Invoice[];
    setInovices: (invoices: Invoice[]) => void;
    refoundId: string;
    setRefoundId: (refoundId: string) => void;
    selectedInvoice: Invoice | null;
    setSelectedInvoice: (invoice: Invoice | null) => void;
    reloadRefounds: boolean;
    setReloadRefounds: (reload: boolean) => void;
}

export const useRefoundStore = create<State>()((set) => ({
    isLoadingRefounds: true,
    setIsLoadingRefounds: (isLoading: boolean) => set({ isLoadingRefounds: isLoading }),
    openModalRefournd: false,
    setOpenModalRefournd: (open: boolean) => set({ openModalRefournd: open }),
    refoundSelected: null,
    setRefoundSelected: (refound : Refound | null) => set({ refoundSelected: refound }),
    refounds: [],
    setRefounds: (refounds : Refound[]) => set({ refounds }),
    inovices: [],
    setInovices: (invoices : any[]) => set({ inovices: invoices }),
    refoundId: '',
    setRefoundId: (refoundId : string) => set({ refoundId }),
    selectedInvoice: null,
    setSelectedInvoice: (invoice : Invoice | null) => set({ selectedInvoice: invoice }),
    reloadRefounds: true,
    setReloadRefounds: (reload : boolean) => set({ reloadRefounds: reload }),
}));