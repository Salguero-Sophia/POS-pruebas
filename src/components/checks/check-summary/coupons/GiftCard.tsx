import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TextField, IconButton } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeSpecialCharsAndKeepNumbers } from "../../../../utils";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getGiftCard } from "../../../../actions";
import { GiftCardActions } from "./GiftCardActions";
import { GiftCard as TypeGiftCard } from "../../../../types/gift-card";
import { useGiftCardStore } from "../../../../store/giftCard/giftcard";
import { useKeyboardCustom } from "../../../../hooks";

const schema = yup.object().shape({
    code: yup.string().required(),
    authCode: yup.string().required(),
    email: yup.string().email().required(),
    amountToSale: yup.number().required(),
    amountToReload: yup.number().required(),
});

const defaultValues = {
    code: '',
    authCode: '',
    amountToSale: 0,
    amountToReload: 0,
    email: '',
}

export const GiftCard = () => {

    const methods = useForm({
        mode: 'onChange',
        defaultValues: defaultValues || {},
        resolver: yupResolver(schema),
    });

    const { control, setValue, getValues, watch } = methods;

    const { email } = watch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const setTransactions = useGiftCardStore(state => state.setTransactions);

    const [giftCard, setGiftCard] = useState<TypeGiftCard | null>(null);

    const { handleOpenKeyboard } = useKeyboardCustom();

    const onSearch = async () => {

        setIsLoading(true);
        setGiftCard(null);

        const { code, authCode } = getValues();

        const response = await getGiftCard(code, authCode);

        if (!response) {
            toast.error("Tarjeta no encontrada");
            setIsLoading(false);
            setValue("code", '');
            setValue("authCode", '');
            return;
        }

        setValue("email", response.email);

        setTransactions(response?.giftCardTransactions);

        setGiftCard(response);

        setIsLoading(false);

    }


    return (
        <div className="flex flex-col gap-4" >

            <Controller
                name="code"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className="flex gap-2 w-full">
                        <TextField
                            label="Ingrese el número de la tarjeta"
                            type="password"
                            variant="outlined"
                            className="w-full"
                            value={value}
                            disabled={isLoading}
                            onChange={(e) => onChange(removeSpecialCharsAndKeepNumbers(e.target.value) || '')}
                        />

                        <IconButton onClick={() => handleOpenKeyboard(getValues("code"), (value: string) => {
                            setValue("code", value);
                        }, true)}>

                            <KeyboardIcon />

                        </IconButton>
                    </div>
                )}
            />

            <Controller
                name="authCode"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className="flex gap-2 w-1/2">
                        <TextField
                            label="Ingrese el código de la tarjeta"
                            type="password"
                            variant="outlined"
                            className="w-full"
                            value={value}
                            disabled={isLoading}
                            onChange={(e) => onChange(removeSpecialCharsAndKeepNumbers(e.target.value) || '')}
                        />

                        <IconButton onClick={() => handleOpenKeyboard(getValues("authCode"), (value: string) => {
                            setValue("authCode", value);
                        }, true)}>

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


            <GiftCardActions search={onSearch} giftCard={giftCard} isEmployee={false} email={email}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <div className="flex gap-2 mt-6">
                            <TextField
                                label="Ingrese el correo electrónico"
                                type="email"
                                variant="outlined"
                                className="w-full"
                                value={value}
                                disabled={isLoading}
                                onChange={(e) => onChange(e.target.value || '')}
                            />

                            <IconButton onClick={() => handleOpenKeyboard(getValues("email"), (value: string) => {
                                setValue("email", value);
                            }, false)}>

                                <KeyboardIcon />

                            </IconButton>
                        </div>
                    )}
                />
            </GiftCardActions>


        </div>
    )
}
