import axios from "axios";
import { apiUrl, getEmployeeFile } from "../../utils";
import { SummarySale } from "../../types/summarySale.type";

export const getSales = async () => {

    try {

        const { code } = await getEmployeeFile();

        const { data } = await axios.get<SummarySale>(`${apiUrl}/employee/sales/${code}`);

        return data;

    } catch (error) {

        return null;

    }

}