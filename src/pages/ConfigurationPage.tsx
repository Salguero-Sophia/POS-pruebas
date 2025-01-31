import TextField from '@mui/material/TextField';
import { Success } from '../components/Success';
import { Error } from '../components/Error';
import { useConfig, useKeyboardCustom } from '../hooks';
import { Title } from '../components';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { Controller } from 'react-hook-form';
import { getStores } from '../actions';
import { Store } from '../interfaces';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { PrinterIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const ConfigurationPage = () => {

    const { control, handleSubmit, errors, onSubmit, register, notification, isLoading, getValues, setValue } = useConfig();

    const { handleOpenKeyboard } = useKeyboardCustom();

    const [disabledInputs, setDisabledInputs] = useState(true);

    useEffect(() => {

        const fetchStores = async () => {

            const data = await getStores();

            if (data) {
                setStores(data);
            }

        }

        fetchStores();

    }, []);

    const handleDisableInputs = (value: string) => {

        const password = import.meta.env.VITE_PASSWORD_DISABLED;

        if (password === value) {
            toast.success("Contraseña correcta");
            setDisabledInputs(false);
        } else {
            toast.error("Contraseña incorrecta");
            setDisabledInputs(true);
        }

    }

    const testPrinter = async () => {

        try {

            const printerName = getValues('printerName');

            const data = await window.ipcRenderer.sendToPrint("hola", printerName!, 6);
            console.log(data);

            toast.success("Impresora configurada correctamente");

        } catch (error) {

            toast.error("Error al imprimir");

        }


    }

    const [stores, setStores] = useState<Store[]>([]);

    return (

        <div className="bg-gray-50 h-screen flex flex-col items-center gap-8">

            <h2 className="sr-only">Configuración del Dispositivo</h2>

            <div className="px-6 py-12 lg:px-8">

                <Title title="Configuración del Dispositivo" />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-20">

                    <div>

                        <div className="flex flex-col gap-8">

                            <div className="flex gap-4">

                                <TextField
                                    className="mt-8 mb-16 bg-white"
                                    required
                                    label="Terminal Id"
                                    autoFocus
                                    id="terminalId"
                                    variant="filled"
                                    fullWidth
                                    error={!!errors.merchant?.terminalId}
                                    helperText={errors?.merchant?.message as string}
                                    {...register("merchant.terminalId")}
                                />

                                <IconButton onClick={() => handleOpenKeyboard(getValues('merchant.terminalId'), (e) => setValue('merchant.terminalId', e), true)}>

                                    <KeyboardIcon />

                                </IconButton>

                            </div>

                            <div className="flex gap-4">

                                <TextField
                                    className="mt-8 mb-16 bg-white"
                                    required
                                    label="Card Acq Id"
                                    id="cardAcqId"
                                    variant="filled"
                                    fullWidth
                                    error={!!errors.merchant?.cardAcqId}
                                    helperText={errors?.merchant?.cardAcqId?.message as string}
                                    {...register("merchant.cardAcqId")}
                                />

                                <IconButton onClick={() => handleOpenKeyboard(getValues('merchant.cardAcqId'), (e) => setValue('merchant.cardAcqId', e), true)}>

                                    <KeyboardIcon />

                                </IconButton>

                            </div>

                            <div className="flex gap-4">

                                <TextField
                                    className="mt-8 mb-16 bg-white"
                                    required
                                    label="Impresora"
                                    id="printerName"
                                    variant="filled"
                                    fullWidth
                                    disabled={disabledInputs}
                                    error={!!errors.printerName}
                                    helperText={errors.printerName?.message as string}
                                    {...register("printerName")}
                                />

                                {
                                    !disabledInputs && (
                                        <IconButton onClick={() => handleOpenKeyboard(getValues('printerName')!, (e) => setValue('printerName', e), false)}>

                                            <KeyboardIcon />

                                        </IconButton>
                                    )
                                }

                                <IconButton onClick={testPrinter}>

                                    <PrinterIcon className="w-6 h-6" />

                                </IconButton>

                            </div>

                            <Controller
                                name="storeId"
                                defaultValue={''}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex gap-4">
                                        <FormControl fullWidth>
                                            <InputLabel id="store-id-label">Tienda</InputLabel>
                                            <Select
                                                className="mt-4"
                                                labelId="store-id"
                                                id="store-id"
                                                value={value}
                                                label="Tienda"
                                                onChange={onChange}
                                                error={!!errors.storeId}
                                                disabled={disabledInputs}
                                            >
                                                <MenuItem value={''}>- Selecciona una tienda -</MenuItem>
                                                {
                                                    stores?.map((store) => (
                                                        <MenuItem key={store.id} value={store.id}> #{store.code} - {store.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>

                                        <IconButton onClick={() => handleOpenKeyboard('', (e) => handleDisableInputs(e), false)}>

                                            <KeyboardIcon />

                                        </IconButton>

                                    </div>

                                )}
                            />

                            {
                                notification && (
                                    notification.status ? <Success title={notification.message} message={notification.message} /> : <Error title={notification.message} message={notification.message} />
                                )
                            }


                        </div>

                    </div>

                    <div className="flex items-center justify-center">

                        {
                            isLoading
                                ? <span className="loader" />
                                : <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Guardar
                                </button>
                        }

                    </div>

                </form>

            </div>

        </div>

    )
}
