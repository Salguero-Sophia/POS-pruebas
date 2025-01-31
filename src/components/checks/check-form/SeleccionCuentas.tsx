import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { currencyFormat } from '../../../utils/currencyFormat';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { SpinnerLoader } from '../..';
import { usePayment } from '../../../hooks';
import { usePaymentStore } from '../../../store';



export const SeleccionCuentas = () => {

    const [reload, setReload] = useState<boolean>(true);

    const isLoading = usePaymentStore(state => state.isLoading);

    const setIsLoading = usePaymentStore(state => state.setIsLoading);
    const checkId = usePaymentStore(state => state.checkId);

    const { handlerSetChecks, handlerSetSelectedCheck } = usePayment();

    const checks = usePaymentStore(state => state.checks);

    useEffect(() => {

        const onSetChecks = async () => {

            setIsLoading(true);

            await handlerSetChecks();

            setIsLoading(false);
        }

        if (reload) {
            onSetChecks();
            setReload(false);
        }

    }, [reload])

    return (
        <div>

            <div className="flex gap-2 items-center">

                <h2 className="text-lg font-medium text-gray-900">Selección de Cuenta</h2>

                <Button
                    variant="outlined"
                    startIcon={<ArrowPathIcon className="h-5 w-5 text-primary" />}
                    disabled={isLoading}
                    onClick={() => setReload(true)}
                >
                    Recargar Cuentas
                </Button>

            </div>

            {
                isLoading
                    ? <SpinnerLoader />
                    : (
                        <div className="mt-10 flex flex-col gap-10">

                            {/* <Controller
                                name="checkId"
                                defaultValue={''}
                                control={control}
                                render={({ field: { onChange, value } }) => ( */}
                                    <FormControl fullWidth>
                                        <InputLabel id="table">Cuentas</InputLabel>
                                        <Select
                                            className="mt-4"
                                            labelId="check"
                                            id="check"
                                            value={checkId}
                                            label="Check"
                                            onChange={(e) => handlerSetSelectedCheck(e.target.value)}
                                        >
                                            {
                                                checks.map((check) => (
                                                    <MenuItem key={check.id} value={check.id}>Cuenta #{check.checkNumber} - {currencyFormat(check.total)}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>

                                {/* )}
                            /> */}

                        </div>
                    )
            }

        </div>
    )
}
