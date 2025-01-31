import toast from "react-hot-toast";
import { getConfig, getEmployeeFile } from "../utils";
import { useRefoundStore } from "../store";
import { getInvoiceToRefound } from "../actions";
import { v4 as uuidv4 } from 'uuid';
import { Refound } from "../types";

export const useRefound = () => {

    const setRefounds = useRefoundStore(state => state.setRefounds);
    const refounds = useRefoundStore(state => state.refounds);
    const setRefoundSelected = useRefoundStore(state => state.setRefoundSelected);
    const setInovices = useRefoundStore(state => state.setInovices);
    const setRefoundId = useRefoundStore(state => state.setRefoundId);

    const handlerSetRefounds = async () => {

        const checksFromFile = await window.ipcRenderer.readChecks();

        const { storeId } = await getConfig();

        const { id: employeeId } = await getEmployeeFile();

        const refounds = checksFromFile.filter(x => x.total < 0).map((x) => ({ id: uuidv4(), ...x, storeId, employeeId }));

        setRefounds(refounds);

        handlerSetRefoundSelected(refounds[0]?.id || '', refounds);

        if (refounds.length === 0) {

            toast.error('No hay reembolsos pendientes');
            return;

        }

    };

    const handlerSetRefoundSelected = (refoundId: string, refoundsParam: Refound[] = []) => {

        setRefoundId(refoundId);

        const dataToValidate = (refoundsParam.length > 0) ? refoundsParam : refounds;

        const refoundSearched =  dataToValidate.find(x => x.id === refoundId) || null;

        setRefoundSelected(refoundSearched);

        if(!refoundSearched) return;

        handlerSetInvoices(refoundSearched);

    };

    const handlerSetInvoices = async (refoundToSearch: Refound) => {

        const monto = refoundToSearch?.total || 0;
        const cantidadItems = refoundToSearch?.checkItems?.length || 0;
    
        const invoices = await getInvoiceToRefound({ monto: -1 * monto , cantidadItems });

        setInovices(invoices);

    }

    return {
        // Methods
        handlerSetRefounds,
        handlerSetInvoices,
        handlerSetRefoundSelected
    }

}