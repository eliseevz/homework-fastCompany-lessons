import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const userEndPoint = "user/"

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint)
        return data
    },
    create: async (payload) => {
        const {data} = await httpService.put(userEndPoint + payload._id, payload)
        return data
    },
    getCurrentUser: async () => {
        const {data} = await httpService.get(userEndPoint + localStorageService.getUserId())
        return data
    },
    update: async (userData) => {
        const {data} = await httpService.put(userEndPoint + userData._id, userData)
        return data
    }
}

export default userService