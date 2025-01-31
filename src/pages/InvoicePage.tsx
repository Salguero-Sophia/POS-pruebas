import { useForm } from "react-hook-form";
import { usePayment } from "../hooks";
import { useKeyboardStore, usePaymentStore } from "../store";
import { useEffect, useState } from "react";
import { Receptor } from "../types/receptor.type";
import { Box, IconButton, TextField } from "@mui/material";
import { ArrowLeftCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SpinnerLoader } from "../components";
import { useNavigate } from "react-router-dom";
import KeyboardIcon from '@mui/icons-material/Keyboard';

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

export const InvoicePage = () => {

    const { handleCreateInvoice } = usePayment();
    const navigate = useNavigate();

    const methods = useForm();

    const { handleSubmit, register, getValues, setValue } = methods;

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

        if (!open) {
            navigate('/home');
        }

    }, [open])


    const resetValues = () => {
        setReceptor({
            nitReceptor: 'CF',
            nombre: 'CONSUMIDOR FINAL',
            direccion: 'GUATEMALA'
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

            const response = await handleCreateInvoice(receptor);

            if (!response.status) {
                setIsLoading(false);
                return response;
            };

            setOpen(false);

            setIsLoading(false);

        }

        setResponseQuestion(true);

    }

    const onClose = () => {

        setReceptor({
            nitReceptor: 'CF',
            nombre: 'CONSUMIDOR FINAL',
            direccion: 'GUATEMALA'
        });

        setResponseQuestion(false);

        // setOpen(false);
    }

    const handlerReturnNavigate = () => {

        navigate('/home');

        setOpen(false);
    }

    const onSubmit = async (data: { [key: string]: string }) => {

        setIsLoading(true);

        const receptor = {
            nitReceptor: data.nitReceptor,
            nombre: data.nombre,
            direccion: 'GUATEMALA'
        }

        const response = await handleCreateInvoice(receptor);

        if (!response.status) {
            setIsLoading(false);
            return response;
        };

        setOpen(false);

        setIsLoading(false);

    }

    const setOpenKeyboard = useKeyboardStore(state => state.setOpen);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);


    const handleOpenKeyboard = (code: string) => {

        setOpenKeyboard(true);
        setKeyboardValue(getValues(code)!);
        setCallback((e: string) => setValue(code, e));

    }

    return (

        <Box sx={style}>
            <div className="flex justify-between">
                <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={handlerReturnNavigate} />
                <ArrowLeftCircleIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={onClose} />
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


                        <div className="flex gap-4">
                            <TextField
                                required
                                id="nitReceptor"
                                label="NIT"
                                variant="filled"
                                type='text'
                                fullWidth
                                {...register('nitReceptor', { required: true })}
                            />

                            <IconButton onClick={() => handleOpenKeyboard('nitReceptor')}>

                                <KeyboardIcon />

                            </IconButton>

                        </div>

                        <div className="flex gap-4">
                            <TextField
                                required
                                id="nombre"
                                label="Nombre"
                                variant="filled"
                                type='text'
                                fullWidth
                                {...register('nombre', { required: true })}
                            />

                            <IconButton onClick={() => handleOpenKeyboard('nombre')}>

                                <KeyboardIcon />

                            </IconButton>

                        </div>

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
    )
}
