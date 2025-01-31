import { Controller, useFormContext } from "react-hook-form";
import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CheckCircleIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useChecksStore  } from "../../../store";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useKeyboard } from "../../../hooks";


export const DivisionPago = () => {

    const { control, watch, setValue, setError, clearErrors, formState: { errors }, getValues } = useFormContext();

    const { handleOpenKeyboard } = useKeyboard({ getValues, setValue });

    const cantidades = useChecksStore(state => state.cantidades);
    const setCantidades = useChecksStore(state => state.setCantidades);
    const setSelectCantidad = useChecksStore(state => state.setSelectCantidad);

    const [personas, setPersonas] = useState(1);

    const total = useChecksStore(state => state.pendienteDePago);

    const watchPersonas = watch("personas", 0);

    useEffect(() => {

        if (watchPersonas) {

            setPersonas(Number(watchPersonas));

        }

    }, [watchPersonas]);

    useEffect(() => {

        if (personas > 0) {

            const valuePerPerson = (total / personas).toFixed(2);

            let sum = 0;

            const values = Array.from({ length: personas }, (_, i) => {

                if (i === personas - 1) {

                    return (total - sum).toFixed(2);

                } else {

                    sum += parseFloat(valuePerPerson);

                    return valuePerPerson;

                }

            });

            const data = values.map((value, index) => ({
                amount: parseFloat(value),
                index,
                paid: false,
                select: false
            }));

            setCantidades(data);

            values.forEach((value, index) => {

                setValue(`cantidad_${index}`, parseFloat(value));

            });

            setSelectCantidad(0);

        }

    }, [personas, setValue]);

    const incrementPersonas = () => {

        setPersonas(prev => prev + 1);

        setValue("personas", personas + 1);

    };

    const decrementPersonas = () => {

        if (personas > 1) {

            setPersonas(prev => prev - 1);

            setValue("personas", personas - 1);

        }

    };

    const handleCantidadChange = (index: number, input: string) => {

        if (input === "") {
            setValue(`cantidad_${index}`, '');
            return;
        };

        let value = parseFloat(input);

        clearErrors(`cantidad_${index}`);

        if (isNaN(value)) {

            setError(`cantidad_${index}`, { type: "manual", message: "Debe ser un número" });

            return;

        }

        if (value < 0) {

            setError(`cantidad_${index}`, { type: "manual", message: "No puede ser menor a 0" });

            return;

        }

        if (value > total) {

            setError(`cantidad_${index}`, { type: "manual", message: "No puede ser mayor al total" });

            return;

        }

        const newValues = [...cantidades.map(c => c.amount)];
        const oldValue = newValues[index];
        const diff = value - oldValue;

        newValues[index] = value;
        let sum = value;

        for (let i = 0; i < newValues.length; i++) {

            if (i !== index) {

                if (diff > 0) {

                    newValues[i] -= (diff / (newValues.length - 1));

                } else {

                    newValues[i] += (Math.abs(diff) / (newValues.length - 1));

                }

                newValues[i] = parseFloat(newValues[i].toFixed(2));

                sum += newValues[i];

            }

        }

        setCantidades(newValues.map((value, index) => ({
            amount: value,
            index,
            paid: false,
            select: false
        })));

        setSelectCantidad(index);

        newValues.forEach((val, idx) => {

            setValue(`cantidad_${idx}`, val);

        });

    };

    return (

        <div className="mt-10 flex flex-col gap-10">

            <div className="mt-4 flex items-center">

                <IconButton onClick={decrementPersonas} disabled={personas <= 1}>

                    <MinusCircleIcon className="w-8" />

                </IconButton>

                <Controller
                    name="personas"
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Personas"
                            type="number"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            error={!!errors.personas}
                        />
                    )}
                />

                <IconButton onClick={incrementPersonas}>

                    <PlusCircleIcon className="w-8" />

                </IconButton>

            </div>

            {cantidades.map((value, index) => (

                <div key={index} className="mt-4 flex items-center">

                    {
                        (!value.paid) && (
                            <>

                                <Controller
                                    name={`cantidad_${index}`}
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <div className="flex gap-4">

                                            <TextField
                                                {...field}
                                                label={`Cantidad ${index + 1}`}
                                                type="number"
                                                variant="outlined"
                                                fullWidth
                                                error={!!errors[`cantidad_${index}`]}
                                                onChange={(e) => handleCantidadChange(index, e.target.value)}
                                                helperText={errors[`cantidad_${index}`]?.message?.toString() || ""}
                                            />

                                            <IconButton onClick={() => handleOpenKeyboard(`cantidad_${index}`)}>

                                                <KeyboardIcon />

                                            </IconButton>

                                        </div>
                                    )}
                                />

                                <div className="flex items-center gap-4">

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: "green", marginLeft: "10px" }}
                                        onClick={() => setSelectCantidad(index)}
                                    >
                                        Seleccionar
                                    </Button>

                                    {(value.select) && <CheckCircleIcon className="w-8 text-green-500" />}

                                </div>

                            </>
                        )
                    }


                </div>

            ))}

        </div>

    )
}