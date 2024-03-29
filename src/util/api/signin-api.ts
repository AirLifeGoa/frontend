import axios from "axios";
import {authServiceUrl, config, baseUrl} from "../../urls";
interface SigninData {
    email: string;
    password: string;
}
export const signinApi = async (data: SigninData) => {
    try {
        const response = await axios.post(`${authServiceUrl}/signin`, data,config);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }

        // read the cookie and set it for all requests to jackfruit.iitgoa.ac.in:3002
        const cookie = response.headers["set-cookie"];
        if (cookie) {
            document.cookie = `${cookie[0]};domain=${baseUrl};path=/`;
        }
        return responseData;
    }
    catch (err : any) {
        const responseData = {
            type: "error",
            data: err.response.data.errors,
            status: err.response.status
        }
        console.log("In error block :",responseData);
        return responseData;
    }


}
