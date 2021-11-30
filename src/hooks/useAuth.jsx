import React, {useContext, useState} from "react"
import PropTypes from "prop-types"
import axios from "axios";
import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service"

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [currentUser, setUser] = useState({})
    const [error, setError] = useState({})

    const signIn = async ({email, password}) => {
        try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
            const payload = {
                email,
                password,
                returnSecureToken: true
            }
            const {data} = await httpAuth.post(url, payload)
            setTokens(data)
            console.log(data, ' resp data')
            console.log('Успешно')
        } catch (e) {
            errorCatcher(e)
            console.log(e)
            const {code, message} = e.response.data.error
            console.log(code, message, " THIS ERROR")
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

    const signUp = async ({email, password, ...rest}) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
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

    return (
        <AuthContext.Provider value={{signUp, currentUser, signIn}}>
            {
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}