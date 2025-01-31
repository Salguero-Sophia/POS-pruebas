import { useKeyboardStore } from "../store";

export const useKeyboardCustom = () => {

    const setOpenNumeric = useKeyboardStore(state => state.setOpenNumeric);
    const setOpen = useKeyboardStore(state => state.setOpen);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);

    const handleOpenKeyboard = (value: string, callback: (e: string) => void, isNumeric: boolean = true) => {

        if (isNumeric) {
            setOpenNumeric(true);
        } else {
            setOpen(true);
        }

        setKeyboardValue(value);
        setCallback(callback);

    }

    return {
        handleOpenKeyboard
    }
}