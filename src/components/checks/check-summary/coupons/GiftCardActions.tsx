import { EyeIcon, CurrencyDollarIcon, BanknotesIcon } from "@heroicons/react/24/outline"
import { TextField, IconButton } from "@mui/material"
import { currencyFormat, getConfig } from "../../../../utils"
import { CreditCard } from "../../../ui/credit-card/CreditCard"
import { useGiftCardStore } from "../../../../store/giftCard/giftcard"
import { useState } from "react"
import { useKeyboardStore } from "../../../../store"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import toast from "react-hot-toast"
import { addTransactionGiftCard } from "../../../../actions"
import { GiftCard } from "../../../../types/gift-card"

interface Props {
    search: () => void;
    giftCard: GiftCard | null;
    isEmployee: boolean;
    email?: string;
    children?: React.ReactNode;
    name?: string;
}

export const GiftCardActions = ({ search, giftCard, isEmployee, email = '', children, name = 'Tarjeta de Regalo' }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setOpenModal = useGiftCardStore(state => isEmployee ? state.setOpenModalEmployee : state.setOpenModal);

    const [amountToSale, setAmountToSale] = useState<number>(0);
    const [amountToReload, setAmountToReload] = useState<number>(0);

    const setOpen = useKeyboardStore(state => state.setOpenNumeric);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);

    const handleOpenKeyboard = (name: "amountToSale" | "amountToReload") => {

        setOpen(true);
        const valueToChange = name === "amountToSale" ? amountToSale : amountToReload;
        setKeyboardValue(isNaN(Number(valueToChange)) || valueToChange === 0 ? "" : valueToChange.toString());

        if (name === "amountToSale") {
            setCallback((e: any) => setAmountToSale(Number(e)));
        } else {
            setCallback((e: any) => setAmountToReload(Number(e)));
        }

    }

    const onReedemPoint = async () => {

        setIsLoading(true);

        if (giftCard === null) {
            toast.error("Debe buscar una tarjeta primero");
            setIsLoading(false);
            return;
        }


        if (amountToSale > giftCard.balance) {
            toast.error("El monto a canjear no puede ser mayor al saldo");
            setIsLoading(false);
            return;
        }

        if (amountToSale <= 0) {
            toast.error("El monto a canjear debe ser mayor a 0");
            setIsLoading(false);
            return;
        }

        const response = await addTransactionGiftCard(giftCard.id, amountToSale, 0, email);

        if (!response) {
            toast.error("Error al realizar el canje");
            setIsLoading(false);
            return;
        }

        const { printerName } = await getConfig();

        window.ipcRenderer.sendToPrint(response.id, printerName, 5);

        toast.success("Canje realizado con éxito");

        setAmountToSale(0);

        search();

        setIsLoading(false);

    }

    const onReload = async () => {

        setIsLoading(true);

        if (giftCard === null) {
            toast.error("Debe buscar una tarjeta primero");
            setIsLoading(false);
            return;
        }

        if (amountToReload <= 0) {
            toast.error("El monto a recargar debe ser mayor a 0");
            setIsLoading(false);
            return;
        }

        const response = await addTransactionGiftCard(giftCard.id, amountToReload, 2, email);

        if (!response) {
            toast.error("Error al realizar la recarga");
            setIsLoading(false);
            return;
        }

        const { printerName } = await getConfig();

        window.ipcRenderer.sendToPrint(response.id, printerName, 5);

        toast.success("Recarga realizada con éxito");

        setAmountToReload(0);

        search();

        setIsLoading(false);

    }

    return (
        <>
            {
                giftCard && (
                    <>
                        <div className="flex w-full items-center justify-center gap-6">
                            <CreditCard
                                cardNumber={giftCard.code}
                                expirationDate={giftCard.expirationDate}
                                cvv={giftCard.authCode}
                                name={name}
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

                        {children}

                        <div className="flew gap-4">
                            <span className="text-xl font-semibold text-primary">Saldo:</span>
                            <span className="text-2xl ml-1 text-green-500">{currencyFormat(giftCard.balance, giftCard.currency)}</span>
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
                                    onChange={(e) => setAmountToSale(Number(e.target.value))}
                                />

                                <IconButton onClick={() => handleOpenKeyboard("amountToSale")}>

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

                        {
                            giftCard.canBeReload && (
                                <div className="flex items-center gap-3 justify-center ">

                                    <div className="flex gap-2 w-full items-center">
                                        <TextField
                                            label="Cantidad a Recargar"
                                            type="number"
                                            variant="outlined"
                                            className="w-full"
                                            value={amountToReload}
                                            disabled={isLoading}
                                            onChange={(e) => setAmountToReload(Number(e.target.value))}
                                        />

                                        <IconButton onClick={() => handleOpenKeyboard("amountToReload")}>

                                            <KeyboardIcon />

                                        </IconButton>
                                    </div>


                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={onReload}
                                        className="w-1/2 rounded-md border border-transparent  bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                                    >
                                        <BanknotesIcon className="w-6 h-6" />
                                        <span>Recargar</span>
                                    </button>

                                </div>
                            )
                        }

                    </>
                )
            }
        </>
    )
}
