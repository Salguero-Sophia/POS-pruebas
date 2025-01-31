import { CheckData } from "../interfaces"

interface Props {
    checks: CheckData[];
    onCheckSelected: (checkdata: CheckData) => void;
    checkSelected?: CheckData;
}

export const Orders = ({ checks, onCheckSelected, checkSelected }: Props) => {

    const onChangeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCheckSelected(JSON.parse(e.target.value));
    }

    return (
        <div className="w-full">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                Número de Cuenta
            </label>
            <div className="mt-2">
                <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    onChange={onChangeSelected}
                    value={JSON.stringify(checkSelected)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                    <option disabled value={undefined}>--Select a Order--</option>
                    {checks.map(check => (
                        <option key={check.nameFile} value={JSON.stringify(check)}>
                            {`${check.nameFile} - ${check.TOTAL1ITEM}`}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
