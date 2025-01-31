import { CheckCircleIcon, EyeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { usePayment } from "../../../hooks";
import { Check } from "../../../types";
import { currencyFormat, formatDateTime } from "../../../utils";
import { Button } from "@mui/material";

interface BodyTableProps {
    checks: Check[];
    optionSelected: { context: string; label: string; };
}

export const BodyTable = ( { checks, optionSelected } : BodyTableProps ) => {

    const { handlerSetSelectedCheck } = usePayment();

    const dateToShow = (detail: Check) => {

        const data: { [key: string]: Date | null } = {
            printed: detail.printedAt,
            payment: detail.paymentAt,
            billing: detail.billingAt
        }

        return data[optionSelected.context] as Date;
    }

    return (
        <tbody className="divide-y divide-gray-200 bg-white">

            {checks.map((detail) => (

                <tr key={detail.id}>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {detail.checkNumber}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{detail.dayPart}</td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{currencyFormat(detail.total)}</td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                        {formatDateTime(dateToShow(detail))}

                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500 ">
                        {
                            detail.paymentAt
                                ? <CheckCircleIcon color="success" className="h-5 w-5 text-green-500" />
                                : <XCircleIcon color="error" className="h-5 w-5 text-red-500" />
                        }
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-center">

                        <Button
                            variant="outlined"
                            startIcon={<EyeIcon className="h-5 w-5 text-primary" />}
                            // disabled={isLoading}
                            onClick={() => handlerSetSelectedCheck(detail.id)}
                        >
                            Seleccionar
                        </Button>

                    </td>

                </tr>
            ))}

        </tbody>
    )
}
