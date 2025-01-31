import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import { useKeyboardStore, usePaymentStore } from '../../../store';
import { usePayment } from '../../../hooks';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export const AmountToPaid = () => {

    const [divideIn, setDivideIn] = useState(1);

    const amountPaid = usePaymentStore(state => state.amountPaid);
    const setAmountPaid = usePaymentStore(state => state.setAmountPaid);

    const setOpen = useKeyboardStore(state => state.setOpenNumeric);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);

    const { handleSetPayment } = usePayment();

    const handleOpenKeyboard = () => {

        setKeyboardValue(isNaN(amountPaid) || amountPaid === 0 ? "" : amountPaid.toString());
        setOpen(true);
        setCallback((e: any) => setAmountPaid(Number(e)));

    }

    useEffect(() => {

        handleSetPayment(divideIn || 0);

    }, [divideIn]);

    return (
        <div className="flex items-center gap-3 ">

            <TextField
                label="Cantidad a pagar"
                type="number"
                variant="standard"
                value={amountPaid || 0}
                onChange={(e) => setAmountPaid(Number(e.target.value || 0))}
            />

            <IconButton onClick={handleOpenKeyboard}>

                <KeyboardIcon />

            </IconButton>

            <IconButton onClick={() => setDivideIn(prev => prev - 1)} disabled={divideIn <= 1}>

                <MinusCircleIcon className="w-8" />

            </IconButton>

            <div className="flex flex-col gap-2 justify-center">

                <p className="font-normal text-lg text-center">Dividir en : <span className="font-semibold text-xl">{divideIn}</span> </p>

            </div>


            <IconButton onClick={() => setDivideIn(prev => prev + 1)}  >

                <PlusCircleIcon className="w-8" />

            </IconButton>

        </div>
    )
}
