import { IconButton, TextField } from "@mui/material";
import { useKeyboardCustom, usePayment } from "../../../../hooks";
import { usePaymentStore } from "../../../../store";
import toast from "react-hot-toast";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SpinnerLoader } from "../../../ui/spinner-loader/SpinnerLoader";
import { EmployeeInfo } from "../EmployeeInfo";
import { CouponsGrid } from "../CouponsGrid";
import { getEmployeeGiftCard } from "../../../../actions";
import { GiftCardActions } from "./GiftCardActions";
import { useState } from "react";
import { GiftCard } from "../../../../types/gift-card";
import { useGiftCardStore } from "../../../../store/giftCard/giftcard";
import { removeSpecialCharsAndKeepNumbers } from "../../../../utils";


interface Props {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const InternalCouponForm = ({ isLoading, setIsLoading }: Props) => {

    const employeeCode = usePaymentStore(state => state.employeeCode);
    const setEmployeeCode = usePaymentStore(state => state.setEmployeeCode);
    const dpiEmployee = usePaymentStore(state => state.dpiEmployee);
    const setDpiEmployee = usePaymentStore(state => state.setDpiEmployee);
    const setTransactionsEmployee = useGiftCardStore(state => state.setTransactionsEmployee);

    const [giftCard, setGiftCard] = useState<GiftCard | null>(null);

    const [isValid, setIsValid] = useState(false);

    const { handleGetCoupons } = usePayment();

    const { handleOpenKeyboard } = useKeyboardCustom();

    const onSearch = async () => {

        setIsLoading(true);
        setGiftCard(null);

        const response = await handleGetCoupons(employeeCode!, dpiEmployee);

        if (!response?.empleado) {
            setIsLoading(false);
            setIsValid(false);
            return;
        }

        const responseGiftCard = await getEmployeeGiftCard(employeeCode!);

        if (responseGiftCard) {
            toast.success("El empleado tiene una tarjeta de regalo activa");
            setGiftCard(responseGiftCard);
            console.log(responseGiftCard.giftCardTransactions);
            setTransactionsEmployee(responseGiftCard.giftCardTransactions);
        }

        if (response.cupones.length > 0) {
            toast.success("Cupones encontrados");
        }

        setIsValid(true);

        setIsLoading(false);
    }

    return (

        <>
            <div className="flex flex-col gap-4" >

                <div className="flex gap-2 w-1/2">
                    <TextField
                        label="Ingrese el código del empleado"
                        type="text"
                        variant="outlined"
                        className="w-full"
                        value={employeeCode || ""}
                        disabled={isLoading}
                        onChange={(e) => setEmployeeCode(Number(e.target.value))}
                    />

                    <IconButton onClick={() => handleOpenKeyboard(employeeCode?.toString() || "", (e) => setEmployeeCode(Number(e)))}>

                        <KeyboardIcon />

                    </IconButton>
                </div>

                <div className="flex gap-2 w-full">
                    <TextField
                        label="Ingrese el número de Identificación del empleado"
                        type="password"
                        variant="outlined"
                        className="w-full"
                        value={dpiEmployee}
                        disabled={isLoading}
                        onChange={(e) => setDpiEmployee(removeSpecialCharsAndKeepNumbers(e.target.value) || '')}
                    />

                    <IconButton onClick={() => handleOpenKeyboard(dpiEmployee, (e) => setDpiEmployee(e))}>

                        <KeyboardIcon />

                    </IconButton>
                </div>

                <button
                    type="button"
                    onClick={onSearch}
                    disabled={isLoading}
                    className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                >
                    <MagnifyingGlassIcon className="w-6 h-6" />
                    {isLoading ? <span className="loader" /> : <span>Buscar</span>}
                </button>

            </div>

            {
                (isLoading)
                    ? <SpinnerLoader />
                    :
                    <>
                        <EmployeeInfo />

                        <CouponsGrid />

                        {
                            isValid && (
                                <GiftCardActions search={onSearch} giftCard={giftCard} isEmployee={true} />
                            )
                        }

                    </>
            }
        </>
    )
}
