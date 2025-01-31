import axios from "axios";
import { apiUrl } from "../../utils";

export const setPrinted = async (checkId: string): Promise<boolean> => {

    try {

        const { data } = await axios.put(`${apiUrl}/check/printed/${checkId}`);

        return data;

    } catch {

        return false;

    }

}