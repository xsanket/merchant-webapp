import { axiosInstance } from "./apicall.js";


export const saveMenu = async (payload) => {
    const response = await axiosInstance("post", '/api/menu', payload)
    return response;

}


export const getMenu = async (payload) => {
    const response = await axiosInstance("get", '/api/get-menu', payload)
    return response;

}

export const deleteMenu = async (Id) => {
    try {
        const response = await axiosInstance("delete", `/api/delete-menu/${Id}`)
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to delete menu');
    }

}