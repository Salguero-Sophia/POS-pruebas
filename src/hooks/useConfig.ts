import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { getConfig } from '../utils';
import { Notification } from '../interfaces';
// import { getEmployees } from '../actions';

const schema = yup.object().shape({
    merchant: yup.object().shape({
        terminalId: yup
            .string()
            .required('Debes ingresar un número de terminal')
            .min(3, 'El número debe de ser mayor de 3'),
        cardAcqId: yup
            .string()
            .required('Debes ingresar un número de Card Acq Id')
            .min(3, 'El número debe de ser mayor de 3')
    }),
    storeId: yup.string(),
    printerName: yup.string(),
    version: yup.string()
});

export const useConfig = () => {

    const [defaultValues, setDefaultValues] = useState<ConfigFile | null>(null);

    const [notification, setNotification] = useState<Notification>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: defaultValues || {},
        resolver: yupResolver(schema),
    });

    const { control ,register, formState, handleSubmit, setValue, getValues } = methods;

    const { errors } = formState;

    const onSubmit = async (data: any) => {

        setIsLoading(true)

        // const employees = await getEmployees(data.storeId);

        // if (employees.length === 0) {
        //     setNotification({ message: 'No se encontraron empleados', status: false });
        //     setIsLoading(false);
        //     return;
        // }

        //valid employee
        // const validEmployee = employees.find((employee) => employee.codigo === Number(data.idEmpleado));

        // if(!validEmployee && data.idEmpleado) {
        //     setNotification({ message: 'El empleado no existe', status: false });
        //     setIsLoading(false);
        //     return;
        // }

        const { message, success } = await window.ipcRenderer.saveConfig(data);

        setNotification({ message: message, status: success });

        setIsLoading(false);

    }

    useEffect(() => {

        const fetchConfig = async () => {

            const config = await getConfig();

            setDefaultValues(config);

            Object.keys(config).forEach((key) => {
                setValue(key as keyof ConfigFile, config[key as keyof ConfigFile]);
            });

        };

        fetchConfig();

    }, [setValue]);

    return {
        control,
        register,
        handleSubmit,
        errors,
        onSubmit,
        isLoading,
        notification,
        TextField,
        methods,
        setValue, 
        getValues
    }

}
