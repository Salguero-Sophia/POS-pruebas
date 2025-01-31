import { create } from 'zustand'

interface State {
    open: boolean
    setOpen: (open: boolean) => void
    openNumeric: boolean
    setOpenNumeric: (open: boolean) => void
    keyboardValue: string
    setkeyboardValue: (keyboardValue: string) => void,
    callback: (param: string) => void;
    setCallback: (callback: (param: string) => void) => void;
    onConfirm: () => void;
}

export const useKeyboardStore = create<State>()((set, get) => ({
    open: false,
    setOpen: (open) => set({ open }),
    openNumeric: false,
    setOpenNumeric: (open) => set({ openNumeric: open }),
    keyboardValue: '',
    setkeyboardValue: (keyboardValue) => set({ keyboardValue }),
    callback: () => { },
    setCallback: (callback) => set({ callback }),
    onConfirm: () => {
        const { callback, keyboardValue } = get()

        callback(keyboardValue)

        set({ open: false, keyboardValue: '', callback: () => { }, openNumeric: false })
    },
}))