import React, {useEffect, useState} from 'react';
import Avatar from "../../../utils/Avatar";
import UserAPI from "../../../API/fake.api/user.api"
import moment from "moment"
import {getDateFrom} from "../../../utils/getDateFrom";

const CommentComponent = ({comment, users, onDelete}) => {

    const getNameFromUserId =  (userId) => {
        const user = users.find((item) => item._id === userId)
        console.log(user)
        return user.name
    }


    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Avatar size="65px"/>
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {getNameFromUserId(comment.userId)}
                                        <span className="small ms-2">
		                                 {getDateFrom(Number(comment.created_at))}
		                              </span>
                                    </p>
                                    <button onClick={() => onDelete(comment._id)} className="btn btn-sm text-primary d-flex align-items-center">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
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
