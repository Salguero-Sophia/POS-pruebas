import { MinusCircleIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useGiftCardStore } from "../../../../store/giftCard/giftcard";
import { currencyFormat, formatDateTime } from "../../../../utils";
import { Box, Modal } from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxHeight: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface Props {
    isEmployee: boolean;
}

export const ModalTransactionsGiftCards = ( { isEmployee } : Props ) => {

    const transactions = useGiftCardStore(state => isEmployee ? state.transactionsEmployee : state.transactions);
    const openModal = useGiftCardStore(state => isEmployee ? state.openModalEmployee : state.openModal);
    const setOpenModal = useGiftCardStore(state => isEmployee ? state.setOpenModalEmployee : state.setOpenModal);

    return (

        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <div>
                    <XCircleIcon className="h-12 w-12 text-red-500 cursor-pointer" onClick={() => setOpenModal(false)} />
                </div>

                <h1 className="font-bold text-2xl p-2 border-b border-grey-700 text-center">Transacciones de Gift Card</h1>

                <div className="mt-8" style={{
                    maxHeight: 'calc(60vh - 200px)',
                    overflowY: 'auto'
                }}>
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
                                        {transaction.createdByCode} - {transaction.createdByName}
                                    </td>

                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {transaction.createdStoreCode} - {transaction.createdStoreName}
                                    </td>

                                    <td className="px-3 py-4 text-sm m-auto text-center">
                                        <div className="flex gap-2">

                                            {
                                                transaction.transactionType === 1 && <MinusCircleIcon className="h-5 w-5 text-red-500" />
                                            }
                                            {
                                                transaction.transactionType === 0 && <MinusCircleIcon className="h-5 w-5 text-red-500" />
                                            }
                                            {
                                                transaction.transactionType === 2 && <PlusCircleIcon className="h-5 w-5 text-green-500" />
                                            }
                                            {currencyFormat(transaction.amount, transaction.currency)}
                                        </div>

                                    </td>

                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {formatDateTime(transaction.createdAt)}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </Box>
        </Modal>


    )
}
