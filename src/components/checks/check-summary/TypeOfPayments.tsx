import { Radio, RadioGroup } from "@headlessui/react"
import { BuildingLibraryIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { usePaymentStore } from "../../../store"
import { payments } from "../../../data"
import { useEffect, useState } from "react"
import { TypeOfPayment } from "../../../types"
import { getTypesOfPayment } from "../../../actions"
import toast from "react-hot-toast"
import { SpinnerLoader } from "../.."
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export const TypeOfPayments = () => {

    const selectedPaymentMethod = usePaymentStore(state => state.selectedPaymentMethod);
    const setSelectedPaymentMethod = usePaymentStore(state => state.setSelectedPaymentMethod);

    const [typesOfPayments, setTypesOfPayments] = useState<TypeOfPayment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {

        setIsLoading(true);

        getTypesOfPayment()
            .then((typesOfPayments) => setTypesOfPayments(typesOfPayments))
            .catch(() => toast.error("Error al cargar los tipos de pago"))
            .finally(() => setIsLoading(false));

    }, []);


    if (isLoading) return <SpinnerLoader />

    return (

        <div className="px-4 py-6 sm:px-6">

            <fieldset>

                <div className="flex gap-4">

                    <FormControl fullWidth>
                        <InputLabel id="table">Tipos de Pago</InputLabel>
                        <Select
                            className="mt-4"
                            labelId="check"
                            id="check"
                            value={selectedPaymentMethod}
                            label="Check"
                            onChange={(e) => setSelectedPaymentMethod(Number(e.target.value))}
                        >
                            {
                                typesOfPayments.filter(x => x.code !== 69).map((payment) => (
                                    <MenuItem key={payment.id} value={payment.code} className="h-16" >
                                        <span className="flex gap-2">

                                            {payments.find(p => p.code === payment.code)?.icon || <BuildingLibraryIcon className="h-5 w-5 text-primary" />}
                                            <span className="block text-sm font-medium text-gray-900">{payment.name}</span>


                                        </span>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <RadioGroup
                        value={selectedPaymentMethod}
                        onChange={setSelectedPaymentMethod}
                        className="mt-4 grid grid-cols-1"
                    >

                        {typesOfPayments.filter(x => x.code === 69).map((payment) => (

                            <Radio
                                key={payment.id}
                                value={payment.code}
                                aria-label={payment.name}
                                className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-primary-500"
                            >

                                <span className="flex flex-1">

                                    <span className="flex flex-col">

                                        <span className="block text-sm font-medium text-gray-900">{payment.name}</span>

                                        {/* {payment.icon} */}
                                        {payments.find(p => p.code === payment.code)?.icon || <BuildingLibraryIcon className="h-5 w-5 text-primary" />}

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
                </div>


            </fieldset>

        </div>

    )

}
