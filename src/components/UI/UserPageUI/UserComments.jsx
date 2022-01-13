import React, {useEffect, useState} from 'react';
import UserNewComment from "./UserNewComment";
import UserCommentsList from "./UserCommentsList";
import {useDispatch, useSelector} from "react-redux";
import {getComments, getCommentsLoadingStatus, loadCommentsList} from "../../../store/comments";

const UserComments = ({userId}) => {

    const dispatch = useDispatch()
    const isLoading = useSelector(getCommentsLoadingStatus())
    const comments = useSelector(getComments())

    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])

    return (
        <div>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <UserNewComment
                        pageId={userId}
                        comments={comments}
                        // setComments={setComments}
                    />
                </div>
            </div>
            <div className="card mb-3">
                {
                    !isLoading
                    ? <div className="card-body ">
                        <h2>Comments</h2>
                        <hr/>
                        <UserCommentsList
                            comments={comments}
                            // setComments={setComments}
                        />
                    </div>
                    : <p>loading</p>
                }
            </div>
        </div>
    );
};

export default UserComments;
