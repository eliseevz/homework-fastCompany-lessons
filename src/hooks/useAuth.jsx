import React, {useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, { setTokens } from "../services/localStorage.service"
import {useHistory} from "react-router-dom"
import {generateAvatarURL} from "../utils/Avatar";
import httpService from "../services/http.service";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [currentUser, setUser] = useState()
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        if (localStorageService.getAccesToken()) {
            getUserData()
        } else {
            setLoading(false)
        }
    }, [])

    const signIn = async ({email, password}) => {
        try {
            const payload = {
                email,
                password,
                returnSecureToken: true
            }
            const {data} = await httpAuth.post("accounts:signInWithPassword", payload)
            setTokens(data)
            await getUserData()
        } catch (e) {
            errorCatcher(e)
            const {code, message} = e.response.data.error
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const objectError = {
                        email: "Пользователь с таким email не найден"
                    }
                    throw objectError
                }
                if (message === "INVALID_PASSWORD") {
                    const objectError = {
                        password: "Пароль введен неверно"
                    }
                    throw objectError
                }
            }
        }

    }

    const logOut = () => {
        localStorageService.removeAuthData()
        setUser(null)
        history.push("/")
    }

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const signUp = async ({email, password, ...rest}) => {
        try {
            const {data} = await httpAuth.post("accounts:signUp", {email, password, returnSecureToken: true})
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(1, 200),
                image: generateAvatarURL(),
                ...rest
            })
        } catch (e) {
            errorCatcher(e)
            const {code, message} = e.response.data.error
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const objectError = {
                        email: "Пользователь с таким email уже существует"
                    }
                    throw objectError
                }
            }
        }
    }

    const createUser = async (data) => {
        try {
            const {content} = await userService.create(data)
            setUser(content)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const errorCatcher = (e) => {
        const {message} = e.response.data
        setError(message)
    }
    
    const getUserData = async () => {
        try {
            const {content} = await userService.getCurrentUser()
            setUser(content)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const updateUser = async (data) => {
        try {
            const content = await userService.update(data)
            setUser(data)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <AuthContext.Provider value={{signUp, currentUser, signIn, logOut, updateUser}}>
            {
                !loading
                ? children
                : <p>загрузка</p>
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}