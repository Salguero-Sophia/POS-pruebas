import { Box, Modal, TextField } from "@mui/material"
import { usePaymentStore } from "../../../store";
import { useEffect, useState } from "react";
import { Receptor } from "../../../types/receptor.type";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { SpinnerLoader } from "../../ui/spinner-loader/SpinnerLoader";
import { useForm } from "react-hook-form";
import { usePayment } from "../../../hooks";

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

export const BillingModal = () => {

    const { handleCreateInvoice } = usePayment();

    const methods = useForm();

    const { handleSubmit, register } = methods;

    const open = usePaymentStore(state => state.open);
    const setOpen = usePaymentStore(state => state.setOpen);

    const [responseQuestion, setResponseQuestion] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [receptor, setReceptor] = useState<Receptor>({
        nitReceptor: 'CF',
        nombre: 'CONSUMIDOR FINAL',
        direccion: 'GUATEMALA'
    });

    useEffect(() => {
        resetValues();
    }, [open])


    const resetValues = () => {
        setReceptor({
            nitReceptor: 'CF',
            nombre: 'CONSUMIDOR FINAL',
            direccion: 'GUATEMAL'
        });

        setResponseQuestion(false);

        setIsLoading(false);
    }

    const onResponseQuestion = async (response: boolean) => {

        if (response) {

            setIsLoading(true);

            setReceptor({
                nitReceptor: 'CF',
                nombre: 'CONSUMIDOR FINAL',
                direccion: 'GUATEMALA'
            });

            await handleCreateInvoice(receptor);

            setOpen(false);

            setIsLoading(false);

        }

        setResponseQuestion(true);

    }

    const onClose = () => {

        setReceptor({
            nitReceptor: 'CF',
            nombre: 'CONSUMIDOR FINAL',
            direccion: 'GUATEMAL'
        });

        setResponseQuestion(false);

        setOpen(false);
    }

    const onSubmit = async (data: { [key: string]: string }) => {

        setIsLoading(true);

        const receptor = {
            nitReceptor: data.nitReceptor,
            nombre: data.nombre,
            direccion: 'GUATEMALA'
        }

        await handleCreateInvoice(receptor);

        setOpen(false);

        setIsLoading(false);

    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <div>
                    <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={onClose} />
                </div>

                <h1 className="font-bold text-2xl p-2 border-b border-grey-700 text-center">Datos de Facturación</h1>

                {
                    isLoading
                        ? <SpinnerLoader />
                        : !responseQuestion && (
                            <div className="p-2 flex flex-col gap-4 items-center">

                                <h2 className="font-semibold text-lg text-center">¿Desea realizarla la factura con consumidor final?</h2>

                                <div className="flex justify-between mt-4 w-full px-4">
                                    <button className="text-lg bg-primary-500 hover:bg-primary w-32 text-white px-5 py-3 rounded-lg" onClick={() => onResponseQuestion(true)} >Si</button>
                                    <button className="text-lg bg-primary-500 hover:bg-primary w-32 text-white px-5 py-3 rounded-lg" onClick={() => onResponseQuestion(false)} >No</button>
                                </div>

                            </div>
                        )
                }


                {
                    (responseQuestion && !isLoading) && (

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-6">

                            <TextField
                                required
                                id="nitReceptor"
                                label="NIT"
                                variant="filled"
                                type='text'
                                fullWidth
                                {...register('nitReceptor', { required: true })}
                            />

                            <TextField
                                required
                                id="nombre"
                                label="Nombre"
                                variant="filled"
                                type='text'
                                fullWidth
                                {...register('nombre', { required: true })}
                            />

                            <div className="flex items-center justify-center">

                                {
                                    isLoading
                                        ? <span className="loader" />
                                        : <button
                                            type="submit"
                                            className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        >
                                            Facturar
                                        </button>
                                }

                            </div>

                        </form>


                    )
                }

            </Box>

        </Modal>
    )
}
