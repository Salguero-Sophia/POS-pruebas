import axios from "axios";
import { Check } from "../../types";
import { apiUrl } from "../../utils";

export const insertCheck = async (check: Check) => {

    try {

        const body = {
            check,
            detail: check.checkItems
        }

        const { data } = await axios.post(`${apiUrl}/check`, body);

        return data;

    } catch (error) {

        console.log(error);

        return null;

    }

};