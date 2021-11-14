import React, {useContext, useEffect, useState} from "react"
import PropTypes from "prop-types";
import userService from "../services/user.service";
import professionService from "../services/profession.service";
import {toast} from "react-toastify";
import Loader from "../components/Loader/Loader";

const ProfessionContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionContext)
}

export const ProfessionProvider = ({children}) => {

    const [professions, setProfessions] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfessionsList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])

    const getProfessionsList = async () => {
        try {
            const {content} = await professionService.get()
            setProfessions(content)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const getProfession = (id) => {
        return professions.find(prof => prof._id === id)
    }

    const errorCatcher = (e) => {
        const {message} = e.response.data
        setError(message)
        setLoading(false)
    }

    return (
        <ProfessionContext.Provider value={{isLoading, professions, getProfession}}>
            {
                !isLoading
                    ? children
                    : <Loader />
            }
        </ProfessionContext.Provider>
    )
}

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

