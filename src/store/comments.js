import {createSlice} from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import commentService from "../services/comment.service";


const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
    },
    reducers: {
        commentsRequested(state) {
            state.isLoading = true
        },
        commentsReceived(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestedFailed(state, action) {
            state.error = action.payload
        },
        commentCreated(state, action) {
            state.entities = [...state.entities, action.payload]
        },
        commentCreatedFailed(state, action) {
            state.error = action.payload
        },
        commentRemoved(state, action) {
            state.entities = action.payload
        },
        commentRemoveFailed(state, action) {
            state.error = action.payload
        }
    }
})

const {reducer: commentsReducer, actions} = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestedFailed,
    commentCreated,
    commentCreatedFailed,
    commentRemoved,
    commentRemoveFailed
} = actions

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const {content} = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (e) {
        dispatch(commentsRequestedFailed())
    }
}

export const createNewComment = (commentData) => async (dispatch) => {
    try {
        const {content} = await commentService.createComment(commentData)
        dispatch(commentCreated(content))
    } catch (e) {
        dispatch(commentCreatedFailed(e.message))
    }
}

export const removeComment = (commentId) => async (dispatch, getState) => {
    try {
        const {content} = await commentService.remove(commentId)
        const state = getState().comments.entities
        if (content === null) {
            const newState = state.filter(comment => comment._id !== commentId)
            dispatch(commentRemoved(newState))
        }
    } catch (e) {
        dispatch(commentRemoveFailed(e.message))
    }
}

export const getComments = () => (state) => {
    return state?.comments?.entities
}

export const getCommentsLoadingStatus = () => (state) => {
    return state?.comments?.isLoading
}

export default commentsReducer