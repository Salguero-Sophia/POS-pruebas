import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface Props {

    children: React.ReactNode

}

const schema = yup.object().shape({
    table: yup
        .number()
        .min(3, 'The product name must be at least 5 characters')
});

export const CheckContent = ({ children }: Props) => {

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    return (
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )

}
