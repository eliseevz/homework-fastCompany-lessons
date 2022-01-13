import React from 'react';
import {getDateFrom} from "../../../utils/getDateFrom";
import {useSelector} from "react-redux";
import {getCurrentUserId, getUserById, getUsersLoadingStatus} from "../../../store/users";

const CommentComponent = ({comment, users, onDelete}) => {

    const currentUserId = useSelector(getCurrentUserId())
    const user = useSelector(getUserById(comment.userId))
    const userLoadingStatus = useSelector(getUsersLoadingStatus())

    if (userLoadingStatus) {
        return "loading"
    }

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width={65}
                            height={65}
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user.name}
                                        <span className="small ms-2">
		                                 {getDateFrom(Number(comment.created_at))}
		                              </span>
                                    </p>
                                    {
                                        comment.userId === currentUserId &&
                                        <button onClick={() => onDelete(comment._id)} className="btn btn-sm text-primary d-flex align-items-center">
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    }

                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentComponent;
