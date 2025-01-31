import { Box, Modal } from "@mui/material";
import { useRefoundStore } from "../../../store";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SpinnerLoader } from "../../ui/spinner-loader/SpinnerLoader";
import { formatDateTime, getConfig } from "../../../utils";
import { createRefound } from "../../../actions";
import toast from "react-hot-toast";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const RembolsoModal = () => {

    const openModalRefournd = useRefoundStore(state => state.openModalRefournd);
    const setOpenModalRefournd = useRefoundStore(state => state.setOpenModalRefournd);
    const refoundSelected = useRefoundStore(state => state.refoundSelected);
    const setInvoices = useRefoundStore(state => state.setInovices);
    const invoice = useRefoundStore(state => state.selectedInvoice);
    const setRefoundId = useRefoundStore(state => state.setRefoundId);
    const setRefoundSelected = useRefoundStore(state => state.setRefoundSelected);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reason, setReason] = useState<string>('');


    const handleRefound = async () => {

        if (refoundSelected === null || invoice === null) return;

        if (reason.trim() === '') {
            toast.error('Ingrese la razón de la anulación');
            return;
        }

        setIsLoading(true);

        const refund = await createRefound(refoundSelected, invoice, reason);

        if (refund === null) {
            toast.error('Error al crear el reembolso');
            setIsLoading(false);
            return;
        }

        toast.success('Reembolso creado con éxito');

        const { printerName } = await getConfig();

        const print = await window.ipcRenderer.sendToPrint(invoice.checkId, printerName, 3);

        console.log({ print });

        setInvoices([]);

        setRefoundId('');
        
        setRefoundSelected(null);

        setIsLoading(false);

        setOpenModalRefournd(false);

    }

    return (
        <Modal
            open={openModalRefournd}
            onClose={() => setOpenModalRefournd(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <div>
                    <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => setOpenModalRefournd(false)} />
                </div>

                <h1 className="font-bold text-2xl p-2 border-b border-grey-700 text-center">Anulación de Factura</h1>

                {
                    (isLoading && invoice === null)
                        ? <SpinnerLoader />
                        : (
                            <div className="p-2 flex flex-col gap-4 items-center">

                                <h2 className="font-semibold text-lg text-center">¿Desea anular la siguiente factura?</h2>

                                <div className="flex flex-col gap-2">

                                    <div className="flex gap-2">

                                        <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                            Serie:
                                        </h4>

                                        <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                            {invoice?.serie}
                                        </h4>

                                    </div>

                                    <div className="flex gap-2">

                                        <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                            Número:
                                        </h4>

                                        <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                            {invoice?.numero}
                                        </h4>

                                    </div>

                                    <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                        Autorización:
                                    </h4>

                                    <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                        {invoice?.numeroDeAutorizacion}
                                    </h4>

                                    <div className="flex gap-2">

                                        <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                            Fecha:
                                        </h4>

                                        <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                            {formatDateTime(invoice?.createdAt || new Date())}
                                        </h4>

                                    </div>

                                </div>

                                <div className="flex flex-col gap-2 w-full">

                                    <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                        Razón de la anulación:
                                    </h4>

                                    <textarea
                                        className="w-full h-24 p-2 border border-gray-300 rounded-lg"
                                        placeholder="Ingrese la razón de la anulación"
                                        value={reason}
                                        rows={4}
                                        onChange={(e) => setReason(e.target.value)}
                                    ></textarea>

                                </div>

                                <div className="flex justify-between mt-4 w-full px-4">
                                    <button
                                        className="text-lg bg-primary-500 hover:bg-primary w-32 text-white px-5 py-3 rounded-lg"
                                        onClick={handleRefound}
                                    >
                                        Si
                                    </button>
                                    <button
                                        className="text-lg bg-primary-500 hover:bg-primary w-32 text-white px-5 py-3 rounded-lg"
                                        onClick={() => setOpenModalRefournd(false)}>
                                        No
                                    </button>
                                </div>

                            </div>
                        )
                }

            </Box>

        </Modal>
    )
}
