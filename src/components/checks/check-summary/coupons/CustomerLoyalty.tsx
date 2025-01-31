import { useState } from "react";
import { useKeyboardStore } from "../../../../store";
import { IconButton, TextField } from "@mui/material";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { MagnifyingGlassIcon, PlusCircleIcon, XCircleIcon, CheckIcon, GiftTopIcon } from "@heroicons/react/24/outline";
import { cancelPoint, reedemAward, reedemPoint, validCode } from "../../../../actions";
import toast from "react-hot-toast";
import { CustomerLoyaltyTransaction } from "../../../../types";
import { formatDateTime, getConfig, removeSpecialCharsAndKeepNumbers } from "../../../../utils";

export const CustomerLoyalty = () => {

    const [code, setCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<CustomerLoyaltyTransaction[]>([]);
    const [isValidCustomerloyalty, setIsValidCustomerLoyalty] = useState<any>(null);
    const [award, setAward] = useState<any>(null);

    const setOpen = useKeyboardStore(state => state.setOpenNumeric);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);

    const handleOpenKeyboard = () => {

        setOpen(true);
        setKeyboardValue(code?.toString() || "");
        setCallback((e: any) => setCode(e));

    }

    const onSearch = async () => {

        setIsLoading(true);

        const data = await validCode(code);

        if (!data.ok) {
            toast.error(data.message);
            setIsLoading(false);
            return;
        } else {
            toast.success(data.message);
        }

        setIsValidCustomerLoyalty(data.ok);
        setTransactions(data.transactions);
        setAward(data.award);

        setIsLoading(false);
    }

    const onReedemPoint = async () => {

        setIsLoading(true);

        const data = await reedemPoint({ code });

        if (!data.ok) {
            toast.error(data.message);
        } else {
            toast.success(data.message);
            onSearch();
        }

        setIsLoading(false);
    }

    const onCancelPoint = async () => {

        setIsLoading(true);

        const data = await cancelPoint({ code });

        if (!data.ok) {
            toast.error(data.message);
        } else {
            toast.success(data.message);
            onSearch();
        }

        setIsLoading(false);

    }

    const onReedmeAward = async () => {

        setIsLoading(true);

        const data = await reedemAward({ code });

        if (!data.ok) {
            toast.error(data.message);
        } else {
            toast.success(data.message);
            onSearch();
        }

        if (data.couponId) {

            const { printerName } = await getConfig();

            await window.ipcRenderer.sendToPrint(data.couponId, printerName, 4);
        }

        setIsLoading(false);

    }

    return (
        <div className="flex flex-col gap-4" >
            <div className="flex gap-2 w-full" >

                <TextField
                    label="Ingrese el código de la tarjeta"
                    type="text"
                    variant="outlined"
                    className="w-full"
                    value={code || ""}
                    disabled={isLoading}
                    onChange={(e) => setCode(removeSpecialCharsAndKeepNumbers(e.target.value) || '')}
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


            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 max-h-36 overflow-auto">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Usuario
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Tienda
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Transacción
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Fecha
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>

                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {transaction.createdBy}
                                            </td>

                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {transaction.store}
                                            </td>

                                            <td className="px-3 py-4 text-sm m-auto text-center">
                                                {
                                                    transaction.typeTransaction === 1 && <PlusCircleIcon className="h-5 w-5 text-yellow-500" />
                                                }
                                                {
                                                    transaction.typeTransaction === 2 && <XCircleIcon className="h-5 w-5 text-red-500" />
                                                }
                                                {
                                                    transaction.typeTransaction === 3 && <CheckIcon className="h-5 w-5 text-green-500" />
                                                }
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {formatDateTime(transaction.createdAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                isValidCustomerloyalty &&
                (
                    <div className="flex gap-4">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={onReedemPoint}
                            className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                        >
                            {
                                isLoading ? <span className="loader" /> : <span>Agregar Punto</span>
                            }
                        </button>
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={onCancelPoint}
                            className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                        >
                            {
                                isLoading ? <span className="loader" /> : <span>Eliminar Punto</span>
                            }
                        </button>
                    </div>
                )
            }

            {
                award && (
                    <>
                        <div className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-primary-500">

                            <span className="flex flex-1">

                                <span className="flex flex-col">

                                    <span className="block text-md font-bold text-gray-900">{award.name}</span>
                                    <span className="block text-sm font-medium text-gray-900">{award.description}</span>

                                    <GiftTopIcon className="h-5 w-5 text-primary-600" />

                                </span>

                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => onReedmeAward()}
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
