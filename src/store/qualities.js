import {createSlice} from "@reduxjs/toolkit";
import qualitiesService from "../services/qualities.service";


const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.lastFetch = Date.now()
        },
        qualitiesRequestFiled: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {reducer: qualitiesReducer, actions} = qualitiesSlice
const {qualitiesReceved, qualitiesRequested, qualitiesRequestFiled} = actions

function isOutdated(date) {
    if (Date.now - date > 10*60*1000) {
        return true
    }
    return false
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().qualities
    if(!lastFetch || isOutdated(lastFetch)) {
        dispatch(qualitiesRequested())
        try {
            const {content} = await qualitiesService.fetchAll()
            dispatch(qualitiesReceved(content))
        } catch (e) {
            dispatch(qualitiesRequestFiled(e.message))
        }
    }
}

export const getQualities = () => (state) => {
    return state?.qualities?.entities
}

export const getQualitiesLoadingStatus = () => (state) => {
    return state?.qualities?.isLoading
}

export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = []
        qualitiesIds.forEach(qId => {
            const findQuality = state.qualities.entities.find((qual) => qual._id === qId)
            qualitiesArray.push(findQuality)
        })
        return qualitiesArray
    }
}


export default qualitiesReducer