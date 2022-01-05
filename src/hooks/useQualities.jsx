import React, {useContext, useEffect, useState} from "react";
import qualitiesService from "../services/qualities.service";
import Loader from "../components/Loader/Loader";


const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchQualities()
    }, [])

    const fetchQualities = async () => {
        try {
            const {content} = await qualitiesService.fetchAll()
            setQualities(content)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const findById = (id) => {
        const result = qualities.find(q => q._id === id)
        return result
    }

    const errorCatcher = (e) => {
        const {message} = e.response.data
        setError(message)
        setLoading(false)
    }

    return (
        <QualitiesContext.Provider value={{qualities, findById}}>
            {
                !isLoading
                ? children
                : <Loader />
            }
        </QualitiesContext.Provider>
    )
}