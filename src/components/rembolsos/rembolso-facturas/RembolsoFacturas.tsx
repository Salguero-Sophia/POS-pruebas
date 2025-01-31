import { useRefoundStore } from '../../../store';
import { Invoice } from '../../../types';
import { currencyFormat, formatDateTime } from '../../../utils';

export const RembolsoFacturas = () => {

    const invoices = useRefoundStore(state => state.inovices);
    const setOpenModalRefournd = useRefoundStore(state => state.setOpenModalRefournd);
    const setInvoiceSelected = useRefoundStore(state => state.setSelectedInvoice);

    const onSelectInvoice = (invoice: Invoice) => {

        setInvoiceSelected(invoice);
        setOpenModalRefournd(true);

    }

    return (
        (invoices) && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">

                <ul role="list" className="divide-y divide-gray-200 max-h[1250px] overflow-auto">

                    {invoices.map((invoice) => (

                        <li key={`${invoice.id}`} className="flex px-4 py-6 sm:px-6">

                            <div className="ml-6 flex flex-1 flex-col">

                                <div className="flex justify-between gap-4 items-center">

                                    <div className="flex flex-col gap-2">

                                        <div className="flex gap-2">

                                            <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                                Serie:
                                            </h4>

                                            <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                                {invoice.serie}
                                            </h4>

                                        </div>

                                        <div className="flex gap-2">

                                            <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                                Número:
                                            </h4>

                                            <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                                {invoice.numero}
                                            </h4>

                                        </div>

                                        <div className="flex gap-2">

                                            <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                                Autorización:
                                            </h4>

                                            <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                                {invoice.numeroDeAutorizacion}
                                            </h4>

                                        </div>

                                        <div className="flex gap-2">

                                            <h4 className="text-md font-bold text-gray-700 hover:text-gray-800">
                                                Fecha:
                                            </h4>

                                            <h4 className="text-md font-normal text-gray-700 hover:text-gray-800">
                                                {formatDateTime(invoice.createdAt)}
                                            </h4>

                                        </div>

                                        <p className="font-bold text-gray-700 hover:text-gray-800">
                                            Detalle:
                                        </p>

                                    </div>

                                    <p className="font-normal text-gray-700 hover:text-gray-800">
                                        Elementos: {invoice.check.checkItems.length}
                                    </p>

                                    <p className="font-normal text-gray-700 hover:text-gray-800">
                                        {(invoice.total !== 0) ? currencyFormat(invoice.total) : ''}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => onSelectInvoice(invoice)}
                                        className="w-32 h-12 rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
                                    >
                                        Seleccionar
                                    </button>

                                </div>



                                <div className="flex justify-between gap-2">



                                    <ul role="list" className="divide-y divide-gray-200 max-h-80 overflow-auto">

                                        {invoice.check.checkItems.map((product, i) => (

                                            <li key={`${product.name}-${i}`} className="flex px-4 py-6 sm:px-6">

                                                <div className="ml-6 flex flex-1 flex-col">

                                                    <div className="flex justify-between gap-4">

                                                        <div className="min-w-0 flex-1">

                                                            <h4 className="text-md font-medium text-gray-700 hover:text-gray-800">
                                                                {product.name}
                                                            </h4>

                                                        </div>

                                                        <p className="font-normal text-gray-700 hover:text-gray-800">
                                                            {product.quantity}
                                                        </p>

                                                        <p className="font-normal text-gray-700 hover:text-gray-800">
                                                            {(product.price !== 0) ? currencyFormat(product.price) : ''}
                                                        </p>

                                                    </div>

                                                </div>

                                            </li>

                                        ))}

                                    </ul>
                                </div>

                            </div>

                        </li>

                    ))}

                </ul>

            </div>
        )
    )
}
