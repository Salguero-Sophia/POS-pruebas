import { useEffect, useState } from "react";
import { SpinnerLoader } from "../..";
import { getEmployee } from "../../../actions";
import { getEmployeeFile, sumarHoras } from "../../../utils";
import { formatDateTime } from '../../../utils/format-datetime';

interface Props {
    isLoading: boolean;
}

export const EmployeeInformation = ({ isLoading }: Props) => {

    const [employee, setEmployee] = useState<any>();

    useEffect(() => {

        const fetchGetEmployee = async () => {

            const employeeResponse = await getEmployee();

            if (employeeResponse) {

                const { session } = await getEmployeeFile()

                setEmployee({ ...employeeResponse, session })

            }

        }

        fetchGetEmployee();

    }, [isLoading]);


    return (

        <div className="mt-10 border-t border-gray-200 pt-10">

            <h2 className="text-lg font-medium text-gray-900">Empleado </h2>

            {
                isLoading ? (
                    <SpinnerLoader />
                ) : (

                    <div>

                        <div className="mt-10 flex flex-col gap-4">

                            <div className="flex gap-2 items-center">

                                <h2 className="text-lg font-semibold text-gray-900">Nombre:</h2>

                                <h2 className="text-lg font-normal text-gray-900">{employee?.name}</h2>

                            </div>

                            {
                                employee?.session && (
                                    <>
                                        <div className="flex gap-2 items-center">

                                            <h2 className="text-lg font-semibold text-gray-900">Sesión:</h2>

                                            <h2 className="text-lg font-normal text-gray-900">{formatDateTime(new Date(employee?.session))}</h2>

                                        </div>

                                        <div className="flex gap-2 items-center">

                                            <h2 className="text-lg font-semibold text-gray-900">Finaliza:</h2>

                                            <h2 className="text-lg font-normal text-gray-900">{formatDateTime(sumarHoras(new Date(employee?.session)))}</h2>

                                        </div>
                                    </>
                                )
                            }




                        </div>



                    </div>

                )
            }

        </div>


    )

}
