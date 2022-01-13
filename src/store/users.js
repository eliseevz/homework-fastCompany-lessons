import {createAction, createSlice} from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import {generateAvatarURL} from "../utils/Avatar";
import history from "../utils/history";
import {generateAuthError} from "../utils/createAuthError";


const initialState = localStorageService.getAccesToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: {userId: localStorageService.getUserId()},
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    }

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.dataLoaded = true
        },
        usersRequestFiled: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        userUpdated: (state, action) => {
            state.entities = action.payload.updatedUsers
        },
        authRequested: (state) => {
            state.error = null
        }
    }
})

const {reducer: usersReducer, actions} = usersSlice
const {
    usersReceived,
    usersRequested,
    usersRequestFiled,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdated,
    authRequested
} = actions

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested())
    try {
        const {content} = await userService.get()
        dispatch(usersReceived(content))
    } catch (e) {
        dispatch(usersRequestFiled(e.message))
    }
}

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId)
    }
}

export const getCurrentUserData = () => (state) => {
    return state.users.entities
    ? state.users.entities.find(u => u._id === state.users.auth.userId)
    :null
}

export const getUsersList = () => (state) => {
    if (state.users.entities) {
        return state.users.entities
    }
}

export const getLoginStatus = () => (state) => {
    return state.users.isLoggedIn
}

export const getDataStatus = () => (state) =>
    state.users.dataLoaded

export const getCurrentUserId = () => (state) =>
    state.users.auth.userId

export const getUsersLoadingStatus = () => (state) =>
    state.users.isLoading

export const getAuthErrors = () => state =>
    state.users.error

const userCreateRequested = createAction("users/userCreateRequested")
const userCreateFailed = createAction("users/userCreateFailed")


export const logIn = ({payload, redirect}) => async (dispatch) => {
    const {email, password} = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({email, password})
        dispatch(authRequestSuccess({userId: data.localId}))
        localStorageService.setTokens(data)
        dispatch(authRequested())
        history.push(redirect)
    } catch (e) {
        const {code, message} = e.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(e.message))
        }
    }
}


export const signUp = ({email, password, ...rest}) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register({email, password})
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({userId: data.localId}))
        dispatch(createUser(
            {
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(1, 200),
                image: generateAvatarURL(),
                ...rest
            }
        ))
    } catch (e) {
        const {code, message} = e.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(e.message))
        }
    }
}

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push("/")
}

export const updateUser = (data) => async (dispatch, getState) => {
    try {
        const content = await userService.update(data)
        const users = getState().users.entities
        console.log()
        const updatedUsers = users.map(user => {
            if (user._id === data._id) {
                return data
            }
            return user
        })
        dispatch(userUpdated({updatedUsers}))
    } catch (e) {
        dispatch(authRequestFailed(e.message))
    }

}

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested())
        try {
            const {content} = await userService.create(payload)
            dispatch(userCreated(content))
            history.push("/users")
        } catch (e) {
            dispatch(userCreateFailed(e.message))
        }
    }
}



const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default usersReducer

