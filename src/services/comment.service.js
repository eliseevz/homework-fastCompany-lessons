import httpService from "./http.service";
const commentEndPoint = "comments/"

const commentService = {
    createComment: async (dataIn) => {
        const {data} = await httpService.put(commentEndPoint + dataIn._id, dataIn)
        return data
    },
    getComments: async (pageId) => {
        const {data} = await httpService.get(commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`,
            }
        })
        return data
    },
    remove: async (id) => {
        const {data} = await httpService.delete(commentEndPoint+id)
        return data
    }
}

export default commentService