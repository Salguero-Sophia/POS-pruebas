import axios, { AxiosError } from "axios";
import { apiUrl, getConfig, getEmployeeFile } from "../../utils";

interface Request {
    code: string,
}

export const reedemAward = async (request: Request) => {

    try {

        const { id } = await getEmployeeFile();

        const { storeId } = await getConfig();

        const body = {
            code: request.code,
            employeeId: id,
            storeId
        }

        const { data } = await axios.post(`${apiUrl}/customerloyalty/reedem-award/${request.code}`, body);

        return data;

    } catch (error: AxiosError | any) {

        return error.response.data;

    }

}