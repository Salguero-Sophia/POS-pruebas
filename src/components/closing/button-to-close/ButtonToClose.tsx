import { SpinnerLoader } from "../..";
import { Button } from "@mui/material";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { SummarySale } from "../../../types/summarySale.type";

interface Props {

    isLoading: boolean;
    summary: SummarySale | null;


}

export const ButtonToClose = ({ isLoading, summary }: Props) => {

    return (
        <div className="flex flex-col gap-6">


            <div className="flex gap-2 items-center">

                <h2 className="text-lg font-medium text-gray-900">Impresión de Transacciones</h2>

            </div>

            {
                isLoading ? (
                    <SpinnerLoader />
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<InformationCircleIcon className="h-5 w-5 text-primary" />}
                        disabled={isLoading || summary == null}
                        type="submit"
                        className="bg-primary text-white mt-6"
                    >
                        Imprimir
                    </Button>
                )
            }


        </div>

    );

}
