import { usePaymentStore } from "../../../store";
import { currencyFormat } from "../../../utils";

export const TotalsSummary = () => {

    const selectedCheck = usePaymentStore(state => state.selectedCheck);

    return (
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">

            {
                selectedCheck?.checkPayments?.map((payment, index) => (
                    <div key={index} className="flex flex-col">

                        <div className="flex items-center justify-between">

                            <dt className="text-sm">{`Pago ${payment?.typeOfPayment?.name}`}</dt>

                            <dd className="text-sm font-medium text-gray-900">{currencyFormat(payment?.amount || 0)}</dd>

                        </div>

                        {
                            payment.voucher && (
                                <div className="flex items-center justify-between">

                                    <dt className="text-sm">Referencía:</dt>

                                    <dd className="text-sm font-medium text-gray-900">{payment.voucher?.authCode}</dd>

                                </div>
                            )
                        }

                        {
                            payment.paymentReference && (
                                <div className="flex items-center justify-between">

                                    <dt className="text-sm">Referencía:</dt>

                                    <dd className="text-sm font-medium text-gray-900">{payment.paymentReference?.authorizationCode}</dd>

                                </div>
                            )
                        }

                    </div>
                ))
            }

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">

                <dt className="text-base font-medium">Total</dt>

                <dd className="text-base font-medium text-gray-900">{currencyFormat(selectedCheck?.total || 0)}</dd>

            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">

                <dt className="text-base font-medium">Pendiente de Pago</dt>

                <dd className="text-base font-medium text-gray-900">{currencyFormat(selectedCheck?.pendingPayment || 0)}</dd>

            </div>

        </dl>
    )
}
