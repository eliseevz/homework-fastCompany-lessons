import React, {useEffect, useState} from "react"
import api from "../../../API"
import Loader from "../../Loader/Loader";
import {Link, useParams} from "react-router-dom";
import UserInfo from "../../UI/UserPageUI/UserInfo";
import UserQualities from "../../UI/UserPageUI/UserQualities";
import UserCompletedMeetings from "../../UI/UserPageUI/UserCompletedMeeting";
import UserNewComment from "../../UI/UserPageUI/UserNewComment";
import UserCommentsList from "../../UI/UserPageUI/UserCommentsList";
import UserComments from "../../UI/UserPageUI/UserComments";

const UserPage = () => {

    const {getById} = api.users

    const {userId} = useParams()

    const [user, setUser] = useState(undefined)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const resp = await getById(userId)
        setUser(resp)
        console.log(resp)
    }

    return (
        user
            ? <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfo
                            name={user.name}
                            profession={user.profession}
                            rate={user.rate}
                            userId={user._id}
                        />
                        <UserQualities
                            qualities = {user.qualities}
                        />
                        <UserCompletedMeetings
                            meetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <UserComments userId = {userId}/>
                    </div>
                </div>
            </div>
            : <Loader />
    )
}

export default UserPage