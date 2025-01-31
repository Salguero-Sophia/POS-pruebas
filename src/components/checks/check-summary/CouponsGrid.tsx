import { Radio, RadioGroup } from "@headlessui/react";
import { usePaymentStore } from "../../../store"
import { CheckCircleIcon, GiftTopIcon } from "@heroicons/react/24/outline";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { currencyFormat } from "../../../utils";
import { usePayment } from "../../../hooks";
import { useState } from "react";

export const CouponsGrid = () => {

    const coupons = usePaymentStore(state => state.coupons);
    const selectedCoupon = usePaymentStore(state => state.selectedCoupon);
    const setSelectedCoupon = usePaymentStore(state => state.setSelectedCoupon);
    const optionSelected = usePaymentStore(state => state.optionSelected);
    const setOptionSelected = usePaymentStore(state => state.setOptionSelected);

    const [isLoading, setIsLoading] = useState(false);

    const { handleRedeemCoupon } = usePayment();

    const onRedeemCoupon = async () => {

        setIsLoading(true);

        await handleRedeemCoupon();

        setIsLoading(false);
    }


    return (

        <div className="flex flex-col gap-4">

            <fieldset>

                <RadioGroup
                    value={selectedCoupon}
                    onChange={setSelectedCoupon}
                    className="my-4 grid grid-cols-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4"
                >

                    {coupons.map((coupon) => (

                        <Radio
                            key={coupon.id}
                            value={coupon}
                            aria-label={coupon.descripcionCupon}
                            className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-primary-500"
                        >

                            <span className="flex flex-1">

                                <span className="flex flex-col">

                                    <span className="block text-sm font-medium text-gray-900">{coupon.descripcionCupon}</span>

                                    <GiftTopIcon className="h-5 w-5 text-primary-600" />

                                </span>

                            </span>

                            <CheckCircleIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-primary-600 [.group:not([data-checked])_&]:hidden"
                            />

                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-primary-500"
                            />

                        </Radio>

                    ))}

                </RadioGroup>

            </fieldset>

            {
                (selectedCoupon && selectedCoupon?.opciones?.length > 0) && (
                    <FormControl fullWidth>
                        <InputLabel id="opciones">Opción</InputLabel>
                        <Select
                            labelId="opciones"
                            id="demo-simple-select"
                            value={optionSelected || ""}
                            label="Opción"
                            onChange={(e) => setOptionSelected(e.target.value as any)}
                        >
                            {
                                selectedCoupon?.opciones.map((opcion) => (
                                    <MenuItem key={opcion.nombre} value={opcion as any}>{opcion.nombre}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                )
            }


            {
                (selectedCoupon) &&
                (
                    <button
                        type="button"
                        onClick={() => onRedeemCoupon()}
                        disabled={isLoading}
                        className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                    >
                        {
                            isLoading ? <span className="loader" /> : <span>Canjear</span>
                        }

                    </button>
                )
            }

        </div>


    )
}
