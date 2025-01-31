import { RembolsoDetail } from "../rembolso-detail/RembolsoDetail"
import { RembolsoFacturas } from "../rembolso-facturas/RembolsoFacturas"
import { RembolsosSeleccion } from "../rembolsos-seleccion/RembolsosSeleccion"

export const RembolsosForm = () => {

    return (
        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

            <div>

                <RembolsosSeleccion />

                <RembolsoDetail />

            </div>


            <div className="mt-10 lg:mt-0 h-auto">

                <h2 className="text-lg font-medium text-gray-900">Facturas</h2>

                <RembolsoFacturas />

            </div>

        </form>
    )

}