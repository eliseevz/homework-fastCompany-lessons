import React, {useState} from 'react';
import UserNewComment from "./UserNewComment";
import UserCommentsList from "./UserCommentsList";

const UserComments = ({userId}) => {
    const [comments, setComments] = useState()
    return (
        <div>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <UserNewComment
                        pageId={userId}
                        comments={comments}
                        setComments={setComments}
                    />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr/>
                    <UserCommentsList
                        comments={comments}
                        setComments={setComments}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserComments;
