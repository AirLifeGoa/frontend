import axios from 'axios';
import {pollutionServiceUrl} from "../../urls";

export const getWindTempApi = async (sourceId : string) => {
    try {
        const response = await axios.get(pollutionServiceUrl + `/temp-wind/${sourceId}`);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        console.log(response.data);
        return responseData;
    }
    catch (e : any) {
        const responseData = {
            type: "error",
            data: e.response.data.errors,
            status: e.response.status
        }
        console.log(e);
        return responseData;
    }
}
