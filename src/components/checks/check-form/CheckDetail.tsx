import { Check } from "../../../types";
import { currencyFormat } from "../../../utils";
import { SpinnerLoader } from "../../ui/spinner-loader/SpinnerLoader";

interface Props {
    selectedCheck: Check
}

export const CheckDetail = ({ selectedCheck }: Props) => {

    return (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">

            {
                !selectedCheck?.checkItems
                    ? <SpinnerLoader />
                    : <ul role="list" className="divide-y divide-gray-200 max-h-80 overflow-auto">

                        {selectedCheck.checkItems.map((product, i) => (

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
            }


        </div>
    )
}
