import React, {useContext, useEffect, useState} from "react"
import {useParams} from "react-router"
import {nanoid} from "nanoid";
import commentService from "../services/comment.service";


const CommentsContext = React.createContext()

export const useComments = () =>
    useContext(CommentsContext)

const CommentsProvider = ({children}) => {

    const [comments, setComments] = useState()
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)

    const {userId} = useParams()

    useEffect(() => {
        setLoading(true)
        getComments(userId)
    }, [userId])

    const createComment = async (data) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now()
        }
        try {
            const {content} = await commentService.createComment(comment)
            setComments(prevState => [...prevState, content])
            console.log(content)
            console.log('hello')
        } catch (e) {
            console.log(e)
        }
    }

    const removeComment = async (id) => {
        try {
            const {content} = await commentService.remove(id)
            console.log(content, ' data in hook')
            if (content === null) {
                setComments(prevState => prevState.filter(item => item._id !== id))
            }
            return content
        } catch (e) {
            console.log(e)
        }
    }

    const getComments = async (pageId) => {
        try {
            const {content} = await commentService.getComments(pageId)
            setComments(content)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return <CommentsContext.Provider value={{ loading, error, comments, createComment, removeComment }}>
        {
            !loading && comments
            ? children
            : <p>loading</p>
        }
    </CommentsContext.Provider>
}

export default CommentsProvider