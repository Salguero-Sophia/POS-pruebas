import { usePaymentStore } from "../../../store";

export const EmployeeInfo = () => {

    const employeeCupon = usePaymentStore(state => state.employeeCupon);

    if (!employeeCupon) return <></>;

    return (
        <div className="flex flex-col gap-4 w-full">

            <div className="flew gap-4">
                <span className="text-sm font-semibold text-primary">Código:</span>
                <span className="text-sm ml-1">{employeeCupon?.codigoEmpleado}</span>
            </div>

            <div className="flew gap-4">
                <span className="text-sm font-semibold text-primary">Nombre:</span>
                <span className="text-sm ml-1">{`${employeeCupon?.primerNombre} ${employeeCupon?.primerApellido}`}</span>
            </div>

            {/* <div className="flew gap-4">
                <span className="text-sm font-semibold text-primary">Identificación:</span>
                <span className="text-sm ml-1">{employeeCupon.identificacion}</span>
            </div> */}

        </div>
    )
}
