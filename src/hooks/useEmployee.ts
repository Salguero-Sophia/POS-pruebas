import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { getConfig, getEmployeeFile } from '../utils';
import { Notification } from '../interfaces';
import { createEmployee } from '../actions/employees/create-employee';
import { useChecksStore } from '../store';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    code: yup.string(),
});

export const useEmployee = () => {

    const [defaultValues, setDefaultValues] = useState<EmployeeFile | null>(null);

    const [notification, setNotification] = useState<Notification>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const setIsActiveRoutes = useChecksStore(state => state.setIsActiveRoutes);

    const navigate = useNavigate();

    const methods = useForm({
        mode: 'onChange',
        defaultValues: defaultValues || {},
        resolver: yupResolver(schema),
    });

    const { control, register, formState, handleSubmit, setValue, getValues } = methods;

    const { errors } = formState;

    const onSubmit = async (data: any) => {

        setIsLoading(true)

        const { storeId } = await getConfig();

        if (!storeId) {
            setNotification({ message: 'No se ha configurado la tienda', status: false });
            setIsLoading(false);
            return;
        }

        const employee = await createEmployee(Number(data.code), storeId);

        if (!employee) {
            setNotification({ message: 'El empleado no existe', status: false });
            setIsLoading(false);
            return;
        }

        const { message, success } = await window.ipcRenderer.writeEmployeeFile({
            id: employee?.id,
            name: employee?.name || "",
            code: data.code,
            session: new Date().toISOString(),
        });

        setNotification({ message: message, status: success });

        setIsLoading(false);

        setIsActiveRoutes(true);

        navigate('/home');

    }

    useEffect(() => {

        const fetchEmployee = async () => {

            const employee = await getEmployeeFile();

            setDefaultValues(employee);

            Object.keys(employee).forEach((key: any) => {
                setValue(key, employee[key as keyof EmployeeFile]);
            });

        };

        fetchEmployee();

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
