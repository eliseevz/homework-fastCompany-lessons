import React, {useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"
import userService from "../services/user.service";
import {toast} from "react-toastify";
import Loader from "../components/Loader/Loader";

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])

    const getUsers = async () => {
        try {
            const {content} = await userService.get()
            console.log(content, ' content in useUSer')
            setUsers(content)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const errorCatcher = (e) => {
        const {message} = e.response.data
        setError(message)
        setLoading(false)
    }

    const getUserById = (id) => {
        return users.find((user) => user._id === id)
    }

    return (
        <UserContext.Provider value={{users, getUserById}}>
            {
                !isLoading
                ? children
                : <Loader />
            }
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}