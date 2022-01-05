import React, {useEffect, useState} from 'react';
import Avatar from "../../../utils/Avatar";
import UserAPI from "../../../API/fake.api/user.api"
import moment from "moment"
import {getDateFrom} from "../../../utils/getDateFrom";
import {useAuth} from "../../../hooks/useAuth";
import {useUser} from "../../../hooks/useUsers";

const CommentComponent = ({comment, users, onDelete}) => {

    const {getUserById} = useUser()
    const {currentUser} = useAuth()
    const user = getUserById(comment.userId)

    // const getNameFromUserId =  (userId) => {
    //     // const user = users.find((item) => item._id === userId)
    //     // console.log(user)
    //     // return user.name
    //     return userId
    // }
    console.log(user, ' user БЛЯТЬ')

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
                                        comment.userId === currentUser._id &&
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
