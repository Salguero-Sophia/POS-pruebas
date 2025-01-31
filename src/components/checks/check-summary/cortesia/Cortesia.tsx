import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useKeyboardCustom } from '../../../../hooks';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCortesia } from '../../../../store/cortesia/cortesia.store';
import { getCortesia } from '../../../../actions/cortesia/get-cortesia';
import { Card } from './Card';
import { ModalTransactions } from './ModalTransactions';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    employeeCode: yup.string().required(),
});

const defaultValues = {
    employeeCode: '',
}

export const Cortesia = () => {

    const methods = useForm({
        mode: 'onChange',
        defaultValues: defaultValues || {},
        resolver: yupResolver(schema),
    });

    const { control, setValue, getValues } = methods;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { handleOpenKeyboard } = useKeyboardCustom();

    const setCortesia = useCortesia(state => state.setCortesia);

    const onSearch = async () => {

        setIsLoading(true);
        setCortesia(null);

        const response = await getCortesia(getValues("employeeCode"));

        console.log({response});

        if (!response) {
            toast.error("No se encontró la cortesía con el código ingresado");
            setIsLoading(false);
            return;
        }

        toast.success("Cortesía encontrada");

        setCortesia(response);

        setIsLoading(false);

    }

    const openKeyboard = () => {
        handleOpenKeyboard(getValues("employeeCode"), (e) => setValue("employeeCode", e))
    }

    return (
        <div className="flex flex-col gap-4" >

            <Controller
                name="employeeCode"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className="flex gap-2 w-full">
                        <TextField
                            label="Ingrese el código del empleado"
                            type="text"
                            variant="outlined"
                            className="w-full"
                            value={value}
                            disabled={isLoading}
                            onChange={(e) => onChange(Number(e.target.value))}
                            onClick={openKeyboard}
                        />

                        <IconButton onClick={openKeyboard}>

                            <KeyboardIcon />

                        </IconButton>
                    </div>
                )}
            />

            <button
                type="button"
                onClick={onSearch}
                disabled={isLoading}
                className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
            >
                <MagnifyingGlassIcon className="w-6 h-6" />
                {isLoading ? <span className="loader" /> : <span>Buscar</span>}
            </button>

            <Card search={onSearch}  />

            <ModalTransactions />

        </div>
    )
}
