import axios from "axios";
import { apiUrl } from "../../utils";


export const getCheckDetail = async (id: string) => {

    try {

        const { data } = await axios.get(`${apiUrl}/check/${id}`);

        return data;

    } catch (error: any) {

        return null

    }

}