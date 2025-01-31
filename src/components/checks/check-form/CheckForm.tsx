import { usePaymentStore } from '../../../store';
import { CheckSumary } from '../check-summary/CheckSumary';
import { CheckDetail } from './CheckDetail';
import { SeleccionCuentas } from './SeleccionCuentas';

export const CheckForm = () => {

    const selectedCheck = usePaymentStore(state => state.selectedCheck);

    return (
        <form  className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

            <div>

                <SeleccionCuentas />

                {
                    selectedCheck
                    && <CheckDetail selectedCheck={selectedCheck} />
                }

            </div>


            <div className="mt-10 lg:mt-0 h-auto">

                <h2 className="text-lg font-medium text-gray-900">Resumen Cuenta</h2>

                <CheckSumary />

            </div>

        </form>
    )

}
