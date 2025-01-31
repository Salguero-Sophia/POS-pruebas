import { FieldValues, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useKeyboardStore } from "../store";

interface Props {
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>
}

export const useKeyboard = ( { getValues, setValue } : Props) => {

    const setOpen = useKeyboardStore(state => state.setOpen);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);

    const handleOpenKeyboard = (input:string) => {

        setOpen(true);
        setKeyboardValue(String(getValues(input)!));
        setCallback( (e:string) => setValue(input, e) );

    }

    return { handleOpenKeyboard }

}