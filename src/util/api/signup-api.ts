import axios from "axios";
import {authServiceUrl} from "../../urls";
interface SignupData {
    email: string;
    password: string;
    name: string;
    sub: boolean;
    areas: string[];
}
export const signupApi = async (data: SignupData) => {
    const modifiedData = {
        email: data.email,
        password: data.password,
        firstName: data.name,
        lastName: "",
        appliedRole: "user",
        sub: data.sub,
        areas: data.areas,
    }
    // handle cors error
    try {
        const response = await axios.post(`${authServiceUrl}/signup`, modifiedData);

        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        console.log("In response block :",responseData);
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

