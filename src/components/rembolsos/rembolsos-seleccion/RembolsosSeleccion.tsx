import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react'
import { SpinnerLoader } from '../../ui/spinner-loader/SpinnerLoader';
import { currencyFormat } from '../../../utils';
import { useRefoundStore } from '../../../store';
import { useRefound } from '../../../hooks';

export const RembolsosSeleccion = () => {

    const reloadRefounds = useRefoundStore(state => state.reloadRefounds);
    const setReloadRefounds = useRefoundStore(state => state.setReloadRefounds);

    const isLoadingRefounds = useRefoundStore(state => state.isLoadingRefounds);
    const refoundId = useRefoundStore(state => state.refoundId);
    const setIsLoadingRefounds = useRefoundStore(state => state.setIsLoadingRefounds);
    const refounds = useRefoundStore(state => state.refounds);

    const { handlerSetRefounds, handlerSetRefoundSelected } = useRefound();

    useEffect(() => {

        const onSetChecks = async () => {

            setIsLoadingRefounds(true);

            await handlerSetRefounds();

            setIsLoadingRefounds(false);
        }

        if (reloadRefounds) {
            onSetChecks();
            setReloadRefounds(false);
        }

    }, [reloadRefounds])

    return (
        <div>

            <div className="flex gap-2 items-center">

                <h2 className="text-lg font-medium text-gray-900">Selección de Reembolsos</h2>

                <Button
                    variant="outlined"
                    startIcon={<ArrowPathIcon className="h-5 w-5 text-primary" />}
                    disabled={isLoadingRefounds}
                    onClick={() => setReloadRefounds(true)}
                >
                    Recargar Cuentas
                </Button>

            </div>

            {
                isLoadingRefounds
                    ? <SpinnerLoader />
                    : (
                        <div className="mt-10 flex flex-col gap-10">

                            <FormControl fullWidth>
                                <InputLabel id="table">Cuentas</InputLabel>
                                <Select
                                    className="mt-4"
                                    labelId="check"
                                    id="check"
                                    value={refoundId}
                                    label="Check"
                                    onChange={(e) => handlerSetRefoundSelected(e.target.value)}
                                >
                                    {
                                        refounds.map((check) => (
                                            <MenuItem key={check.id} value={check.id}>Reembolso #{check.checkNumber} {currencyFormat(check.total)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                        </div>
                    )
            }

        </div>
    )
}
