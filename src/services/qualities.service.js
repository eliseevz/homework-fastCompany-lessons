import httpService from "./http.service";
const qualitiesEndPoint = "quality/"

const qualitiesService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualitiesEndPoint)
        return data
    },
    get: async (id) => {
        const { data } = await httpService.get(qualitiesEndPoint + id)
        return data
    }
}

export default qualitiesService