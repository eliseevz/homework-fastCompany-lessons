import axios from "axios"
import {toast} from "react-toastify"
import config from "../config.json"

axios.defaults.baseURL = config.apiEndPoint

axios.interceptors.response.use((res) => res, (e) => {
    console.log("interceptor")
    const expectedErrors =
        e.response && e.response.status >= 400 && e.response.status < 500
    if (!expectedErrors) {
        toast.error("Something gone wrong. Try it later")
    }
    return Promise.reject(e)
})

const httpService= {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService