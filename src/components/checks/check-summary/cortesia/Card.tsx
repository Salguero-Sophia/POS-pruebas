import { useState } from 'react'
import { useCortesia } from '../../../../store/cortesia/cortesia.store';
import { useKeyboardCustom } from '../../../../hooks';
import { CreditCard } from '../../../ui/credit-card/CreditCard';
import { CurrencyDollarIcon, EyeIcon } from '@heroicons/react/24/outline';
import { currencyFormat, getConfig } from '../../../../utils';
import { CurrencyType } from '../../../../types/gift-card';
import { IconButton, TextField } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import toast from 'react-hot-toast';
import { addTransactionCortesia } from '../../../../actions/cortesia/add-transaction-cortesia';

const dateLastMonth = new Date();
dateLastMonth.setMonth(dateLastMonth.getMonth() - 1);

interface Props {
    search: () => void;
}

export const Card = ({search} : Props) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setOpenModal = useCortesia(state => state.setOpenModal);
    const cortesia = useCortesia(state => state.cortesia);

    const [amountToSale, setAmountToSale] = useState<number>(0);

    const { handleOpenKeyboard } = useKeyboardCustom();

    const onReedemPoint = async () => {

        setIsLoading(true);

        if (cortesia === null) {
            toast.error("Debe buscar una tarjeta primero");
            setIsLoading(false);
            return;
        }


        if (amountToSale > cortesia.currentBalance) {
            toast.error("El monto a canjear no puede ser mayor al saldo");
            setIsLoading(false);
            return;
        }

        if (amountToSale <= 0) {
            toast.error("El monto a canjear debe ser mayor a 0");
            setIsLoading(false);
            return;
        }

        const response = await addTransactionCortesia(cortesia.id, amountToSale);

        if (!response) {
            toast.error("Error al realizar el canje");
            setIsLoading(false);
            return;
        }

        const { printerName } = await getConfig();

        window.ipcRenderer.sendToPrint(response.id, printerName, 8);

        toast.success("Canje realizado con éxito");

        setAmountToSale(0);

        search();

        setIsLoading(false);

    }

    const openKeyboard = () => {
        handleOpenKeyboard(isNaN(Number(amountToSale)) || amountToSale === 0 ? "" : amountToSale.toString(), (e) => setAmountToSale( Number(e) ), true )
    }

    return (
        <>
            {
                cortesia && (
                    <>
                        <div className="flex w-full items-center justify-center gap-6">
                            <CreditCard
                                cardNumber={"**** **** **** ****"}
                                expirationDate={dateLastMonth}
                                cvv={"***"}
                                name={"Cortesía de Empleado"}
                            />
                            <button
                                type="button"
                                onClick={() => setOpenModal(true)}
                                disabled={isLoading}
                                className="w-1/8 rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                            >
                                <div className="flex flex-col items-center">
                                    <EyeIcon className="w-6 h-6" />
                                    <span>Transacciones</span>
                                </div>
                            </button>

                        </div>

                        <div className="flew gap-4">
                            <span className="text-xl font-semibold text-primary">Saldo:</span>
                            <span className="text-2xl ml-1 text-green-500">{currencyFormat(cortesia.currentBalance,  CurrencyType.QTZ)}</span>
                        </div>

                        <div className="flex items-center gap-3 justify-center ">

                            <div className="flex gap-2 w-full items-center">
                                <TextField
                                    label="Cantidad a Canjear"
                                    type="number"
                                    variant="outlined"
                                    className="w-full"
                                    value={amountToSale}
                                    disabled={isLoading}
                                    onClick={openKeyboard}
                                    onChange={(e) => setAmountToSale(Number(e.target.value))}
                                />

                                <IconButton onClick={openKeyboard}>

                                    <KeyboardIcon />

                                </IconButton>
                            </div>

                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={onReedemPoint}
                                className="w-1/2 rounded-md border border-transparent  bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                            >
                                <CurrencyDollarIcon className="w-6 h-6" />
                                <span>Canjear</span>
                            </button>

                        </div>

                    </>
                )
            }
        </>
    )
}
