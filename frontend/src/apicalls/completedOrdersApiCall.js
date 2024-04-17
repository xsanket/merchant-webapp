import { axiosInstance } from "./apicall.js";


export const getCompletedOrders = async (payload) => {
    const response = await axiosInstance("get", '/api/completed-order', payload)
    return response;

}