import { useForm } from "react-hook-form";
import { ButtonToClose, ClosingSummary, EmployeeInformation } from "../components"
import { useEffect, useState } from "react";
import { getSales } from "../actions/employees/get-sales";
import { SummarySale } from "../types/summarySale.type";
import { getConfig, getEmployeeFile } from "../utils";

export const ClosingPage = () => {

    const methods = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<SummarySale | null>(null);

    const { handleSubmit } = methods;

    useEffect(() => {

        const fetchClosing = async () => {

            setIsLoading(true);

            const response = await getSales();

            console.log({ response });

            if (response) {

                setSummary(response);

            }

            setIsLoading(false);

        };

        fetchClosing();

    }, []);

    const onSubmit = async () => {

        setIsLoading(true);

        const { printerName } = await getConfig();
        const { code } = await getEmployeeFile();

        await window.ipcRenderer.sendToPrint(code, printerName, 7);~

        setIsLoading(false);

    }

    return (

        <div className="bg-gray-50 mb-20">

            <h2 className="sr-only font-bold">Impresión de Transacciones</h2>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-full">

                <form onSubmit={handleSubmit(onSubmit)} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

                    <div>

                        <ButtonToClose isLoading={isLoading} summary={summary} />

                        <EmployeeInformation isLoading={isLoading} />

                    </div>

                    <ClosingSummary summary={summary} />

                </form>

            </div>

        </div>

    )

}
