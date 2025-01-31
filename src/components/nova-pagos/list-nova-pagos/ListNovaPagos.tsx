import { ArrowPathIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import { MouseEvent, useState } from "react";
import { usePaymentStore } from "../../../store";
import { BodyTable } from "./BodyTable";

const options: Option[] = [
    { context: 'printed', label: 'Cuentas Impresas' },
    { context: 'payment', label: 'Cuentas Pagadas' },
    { context: 'billing', label: 'Cuentas Facturadas' },
]

type Option = {
    context: string;
    label: string;
}

export const ListNovaPagos = () => {

    const [optionSelected, setOptionSelected] = useState<Option>({ context: 'printed', label: 'Cuentas Impresas' });

    const checksPrinted = usePaymentStore(state => state.checksPrinted);
    const checksPayment = usePaymentStore(state => state.checksPayment);
    const checksBilling = usePaymentStore(state => state.checksBilling);

    const [selectedChecksMenu, setSelectedChecksMenu] = useState<HTMLButtonElement | null>(null);

    function openSelectedChecksMenu(event: MouseEvent<HTMLButtonElement>) {

        setSelectedChecksMenu(event.currentTarget);

    }

    function closeSelectedChecksMenu() {

        setSelectedChecksMenu(null);

    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">

            <div className="sm:flex sm:items-center">

                <div className="sm:flex">

                    <h1 className="text-base font-semibold leading-6 text-gray-900">{optionSelected.label}</h1>

                </div>

                <IconButton
                    aria-haspopup="true"
                    onClick={openSelectedChecksMenu}
                    size="large"
                >
                    <EllipsisVerticalIcon className="h-5 w-5 text-primary" />
                </IconButton>
                <Menu
                    id="selectedProductsMenu"
                    anchorEl={selectedChecksMenu}
                    open={Boolean(selectedChecksMenu)}
                    onClose={closeSelectedChecksMenu}
                >
                    <MenuList>
                        {
                            options.map((option) =>
                                <MenuItem
                                    key={option.context}
                                    onClick={() => {
                                        setOptionSelected(option);
                                        closeSelectedChecksMenu();
                                    }}
                                >
                                    <ListItemText primary={option.label} />
                                </MenuItem>
                            )
                        }
                    </MenuList>
                </Menu>

                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

                    <Button
                        variant="outlined"
                        startIcon={<ArrowPathIcon className="h-5 w-5 text-primary" />}
                    // disabled={isLoading}
                    // onClick={() => setReloadChecks(true)}
                    >
                        Recargar Precuentas
                    </Button>

                </div>

            </div>

            <div className="mt-8 flow-root">

                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">


                            <table className="min-w-full divide-y divide-gray-300">

                                <thead className="bg-gray-50">

                                    <tr>

                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">

                                            Número de Cuenta

                                        </th>

                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Turno
                                        </th>

                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Total
                                        </th>

                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Fecha
                                        </th>

                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Está Pagada
                                        </th>

                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            Procesar Factura
                                        </th>

                                    </tr>

                                </thead>

                                {
                                    (optionSelected.context === 'printed') && <BodyTable checks={checksPrinted} optionSelected={optionSelected} />
                                }

                                {
                                    (optionSelected.context === 'payment') && <BodyTable checks={checksPayment} optionSelected={optionSelected} />
                                }

                                {
                                    (optionSelected.context === 'billing') && <BodyTable checks={checksBilling} optionSelected={optionSelected} />
                                }

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}