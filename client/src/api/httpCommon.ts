import axios from "axios";

const httpCommon = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    withCredentials: true
})

export default httpCommon;