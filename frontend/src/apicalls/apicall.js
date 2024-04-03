import axios from 'axios';


// export const axiosInstance = async (method, endpoint, payload) => {
//     try {
//         const response = await axios({
//             method,
//             url:endpoint,
//             data:payload,
//         });
//         return response.data;

//     }  
//     catch (error) {
//         return error;
//     }
// }



export const axiosInstance = async (method, endpoint, payload) => {
  try {
    const response = await axios({
      method,
      url: endpoint,
      data: payload,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};