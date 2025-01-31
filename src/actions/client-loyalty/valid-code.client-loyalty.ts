import axios, { AxiosError } from "axios"
import { apiUrl } from "../../utils"

export const validCode = async (code: string) => {

    try {

        const { data } = await axios.get(`${apiUrl}/customerloyalty/valid-code/${code}`)

        return data;

    } catch (error: AxiosError | any) {

        return error.response.data;

    }

}