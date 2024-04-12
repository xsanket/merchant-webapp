import { axiosInstance } from "./apicall.js";

//fetch live order
export const getOrder = async () => {
    const response = axiosInstance("get", "/api/order");
    return response;
}
