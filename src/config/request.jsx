import axios from "axios";
export const request = axios.create({ baseURL: "http://http://localhost:5174" })

// request.interceptors.request.use((config) => {
//     config.headers = {
//         ...config.headers,
//         token: "asdfghjk"
//     }
// }, (error) => {
//     if(error.status == 401){

//     }
// })