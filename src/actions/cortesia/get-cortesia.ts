import axios from "axios";
import { apiUrl, getConfig, getEmployeeFile } from "../../utils"
import { Cortesia } from "../../types/cortesia-transaction";
// import { sleep } from '../../utils/sleep';

export const getCortesia = async (employeeCode: string) => {
    try {
        
        const { storeId } = await getConfig();
        const { id } = await getEmployeeFile();
        
        const { data: isValid } = await axios.get<boolean>(`${apiUrl}/cortesia/valid/${employeeCode}/${storeId}/${id}`);

        if (!isValid) {
            return null;
        }

        const { data } = await axios.get<Cortesia>(`${apiUrl}/cortesia/${employeeCode}/${storeId}/${id}`);

        return data;

    } catch (error: any) {
        
        return null;

    }
}
