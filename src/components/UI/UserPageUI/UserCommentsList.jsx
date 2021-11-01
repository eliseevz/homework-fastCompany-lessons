import React, {useEffect, useState} from 'react';
import commentsAPI from "../../../API/fake.api/comments.api"
import usersAPI from "../../../API/fake.api/user.api"
import {useParams} from "react-router-dom"
import CommentComponent from "./CommentComponent";
import Loader from "../../Loader/Loader";
import _ from "lodash"

const UserCommentsList = ({comments, setComments}) => {

    const [users, setUsers] = useState()

    const {fetchCommentsForUser, remove} = commentsAPI
    const {fetchAll:fetchAllUsers} = usersAPI

    const {userId} = useParams()

    useEffect(() => {
        fetchCommentsForUser(userId)
            .then(data => setComments(data))
            .catch(err => console.log(err))
        fetchAllUsers()
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }, [])

    const onRemoveHandler = async (id) => {
        const removedId = await remove(id)
        // const newComments = await fetchCommentsForUser(id)
        const newComments = comments.filter(comment => comment._id !== removedId)
        setComments(newComments)
    }

    const sortedComments = comments
        ? _.orderBy(comments, ["created_at"], ["desc"])
        : comments

    return (
        <div>
            {
                comments && users
                    ? sortedComments.map(comment => (<CommentComponent onDelete={onRemoveHandler} users={users} comment={comment}/>))
                    : <Loader/>
            }
        </div>
    );
};

export default UserCommentsList;
