import { axiosInstance } from "./apicall";


export const restaurantLogin = async (payload) => {
    const response = await axiosInstance("post", "./api/restaurant-login", payload);
    return response;
};

export const restaurantRegistration = async (payload) => {
    const response = await axiosInstance("post", "./api/restaurant-registration", payload);
    return response;
};