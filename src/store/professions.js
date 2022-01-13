import {createSlice} from "@reduxjs/toolkit";
import professionService from "../services/profession.service";


const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested(state) {
            state.isLoading = true
        },
        professionsReceived(state, action) {
            state.entities = action.payload
            state.isLoading = false
            state.lastFetch = Date.now()
        },
        professionRequestedFailed(state, action) {
            state.error = action.payload
        }
    }
})

const {reducer: professionsReducer, actions} = professionsSlice
const {professionsRequested, professionsReceived, professionRequestedFailed} = actions

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(professionsRequested())
    try {
        const {content} = await professionService.get()
        dispatch(professionsReceived(content))
    } catch (e) {
        dispatch(professionRequestedFailed())
    }
}

export const getProfessions = () => (state) => {
    return state?.professions?.entities
}

export const getProfessionsLoadingStatus = () => (state) => {
    return state?.professions?.isLoading
}

export const getProfessionByIds = (professionId) => (state) => {
    if (state?.professions?.entities) {
        return state.professions.entities.find(prof => prof._id === professionId)
    }
}

export default professionsReducer