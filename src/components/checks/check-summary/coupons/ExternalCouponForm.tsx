import { IconButton, TextField } from "@mui/material";
import { useKeyboardStore, usePaymentStore } from "../../../../store";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { GiftTopIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCoupon } from "../../../../hooks";
import toast from "react-hot-toast";
import { useState } from "react";
import { Cupone } from "../../../../types/response-cupones-empleado";

interface Props {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const ExternalCouponForm = ({ isLoading, setIsLoading }: Props) => {

    const couponCode = usePaymentStore(state => state.couponCode);
    const setCouponCode = usePaymentStore(state => state.setCouponCode);
    const [coupon, setCoupon] = useState<Cupone | null>(null);

    const { handleValidCoupon, handleCanjearCoupon } = useCoupon();

    const setOpen = useKeyboardStore(state => state.setOpen);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);

    const handleOpenKeyboard = () => {

        setOpen(true);
        setKeyboardValue(couponCode?.toString() || "");
        setCallback((e: any) => setCouponCode(e));

    }

    const onSearch = async () => {

        setIsLoading(true);

        const data = await handleValidCoupon(couponCode);

        if (!data) {
            toast.error("Cupón no encontrado o ya fue canjeado");
        } else {
            toast.success("Cupón encontrado con éxito");
        }

        setCoupon(data);

        setIsLoading(false);
    }

    const onCanjear = async () => {

        setIsLoading(true);

        const data = await handleCanjearCoupon(coupon!);

        if (!data) {
            toast.error("Error al canjear el cupón");
        } else {
            toast.success("Cupón canjeado con éxito");
        }

        setCoupon(null);
        setCouponCode('');
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col gap-4" >
            <div className="flex gap-2 w-full" >

                <TextField
                    label="Ingrese el código del cupón"
                    type="text"
                    variant="outlined"
                    className="w-full"
                    value={couponCode || ""}
                    disabled={isLoading}
                    onChange={(e) => setCouponCode(e.target.value || '')}
                />

                <IconButton onClick={handleOpenKeyboard}>

                    <KeyboardIcon />

                </IconButton>

                <IconButton
                    onClick={onSearch}
                    color="primary"
                    size="large"
                    aria-label="search"
                    disabled={isLoading}
                    className="bg-primary-600 hover:bg-primary-700 border border-primary-600"
                >
                    {isLoading ? <span className="loader" /> : <MagnifyingGlassIcon className="w-5" />}

                </IconButton>

            </div>

            {
                coupon && (
                    <>
                        <div className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-primary-500">

                            <span className="flex flex-1">

                                <span className="flex flex-col">

                                    <span className="block text-md font-bold text-gray-900">{coupon.cupon}</span>
                                    <span className="block text-sm font-medium text-gray-900">{coupon.descripcionCupon}</span>

                                    <GiftTopIcon className="h-5 w-5 text-primary-600" />

                                </span>

                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => onCanjear()}
                            disabled={isLoading}
                            className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                        >
                            {
                                isLoading ? <span className="loader" /> : <span>Canjear</span>
                            }

                        </button>
                    </>
                )
            }
        </div>

    )
}

