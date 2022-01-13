import React, {useEffect, useState} from 'react';
import commentsAPI from "../../../API/fake.api/comments.api"
import usersAPI from "../../../API/fake.api/user.api"
import {useParams} from "react-router-dom"
import CommentComponent from "./CommentComponent";
import Loader from "../../Loader/Loader";
import _ from "lodash"
import {useComments} from "../../../hooks/useComments";
import {useDispatch} from "react-redux";
import {removeComment} from "../../../store/comments";

const UserCommentsList = ({comments, setComments}) => {

    const [users, setUsers] = useState()
    const dispatch = useDispatch()

    // const {removeComment} = useComments()

    const onRemoveHandler = async (id) => {
        // const response = await removeComment(id)
        dispatch(removeComment(id))
    }

    console.log('comments:', comments)
    const sortedComments = comments
        ? _.orderBy(comments, ["created_at"], ["desc"])
        : comments

    return (
        <div>
            {
                sortedComments.map(comment => (<CommentComponent key={comment._id} onDelete={onRemoveHandler} users={users} comment={comment}/>))
            }
        </div>
    );
};

export default UserCommentsList;
