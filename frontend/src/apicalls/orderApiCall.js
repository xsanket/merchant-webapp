import { axiosInstance } from "./apicall.js";

//fetch live order
export const getOrder = async () => {
    const response = axiosInstance("get", "/api/order");
    return response;
}
//Delete live order
export const deleteOrder = async (orderId) => {
    try {
      const response = await axiosInstance('delete', `/api/order/${orderId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete order');
    }
  };
