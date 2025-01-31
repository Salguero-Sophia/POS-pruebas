
import { Success } from '../components/Success';
import { Error } from '../components/Error';
import { useEmployee } from '../hooks';
import { EmployeeInformation, Title } from '../components';
import { TextField, IconButton } from '@mui/material';
import { Controller } from 'react-hook-form';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useKeyboardStore } from '../store';
import { useEffect, useState } from 'react';
import { getEmployeeFile, sumarHoras } from '../utils';
import { useNavigate } from 'react-router-dom';

export const EmployeePage = () => {

    const { handleSubmit, errors, onSubmit, control, notification, isLoading, setValue, getValues } = useEmployee();

    const setOpen = useKeyboardStore(state => state.setOpenNumeric);
    const setKeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const setCallback = useKeyboardStore(state => state.setCallback);
    const [isSession, setIsSession] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleOpenKeyboard = () => {

        setOpen(true);
        setKeyboardValue(getValues('code')!);
        setCallback((e: string) => setValue('code', e));

    }

    useEffect(() => {

        const asyncFunction = async () => {
            const { session } = await getEmployeeFile();

            if (session) {
                const endSesion = sumarHoras(new Date(session));

                const now = new Date();

                const diff = now.getTime() - endSesion.getTime();

                if (diff > 0) {
                    await window.ipcRenderer.writeEmployeeFile({
                        id: undefined,
                        name: "",
                        code: "",
                        session: undefined,
                    });
                    window.location.reload();
                } else {
                    setIsSession(true);
                }
            }

        }

        asyncFunction();

    }, [])

    return (
        <div className="bg-gray-50 h-screen flex flex-col items-center gap-8">

            <h2 className="sr-only">Información de Empleado</h2>

            <div className="px-6 py-12 lg:px-8">

                <Title title="Información de Empleado" />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-20">

                    <div>

                        <div>

                            <Controller
                                name="code"
                                defaultValue={''}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex gap-4">
                                        <TextField
                                            required
                                            id="code"
                                            value={value}
                                            label="Empleado"
                                            onChange={onChange}
                                            error={!!errors.code}
                                            helperText={errors?.code?.message as string}
                                            variant="filled"
                                            type='number'
                                            fullWidth
                                        />

                                        <IconButton onClick={handleOpenKeyboard}>

                                            <KeyboardIcon />

                                        </IconButton>

                                    </div>
                                )}
                            />

                            <EmployeeInformation isLoading={isLoading} />

                            {
                                notification && (
                                    notification.status ? <Success title={notification.message} message={notification.message} /> : <Error title={notification.message} message={notification.message} />
                                )
                            }


                        </div>

                    </div>

                    <div className="flex flex-col gap-3 items-center justify-center">

                        {
                            isSession
                            && (<button
                                type="button"
                                onClick={() => navigate('/home')}
                                className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Ir a Canjes / Cobros
                            </button>)
                        }

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
