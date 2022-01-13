import React, {useEffect, useState} from "react"
import api from "../../../API"
import Loader from "../../Loader/Loader";
import {Link, useParams} from "react-router-dom";
import UserInfo from "../../UI/UserPageUI/UserInfo";
import UserQualities from "../../UI/UserPageUI/UserQualities";
import UserCompletedMeetings from "../../UI/UserPageUI/UserCompletedMeeting";
import UserComments from "../../UI/UserPageUI/UserComments";
import CommentsProvider from "../../../hooks/useComments";
import UserProfession from "../../UI/UserPageUI/UserProfession";
import {useSelector} from "react-redux";
import {getUserById} from "../../../store/users";

const UserPage = () => {

    const {userId} = useParams()
    const user = useSelector(getUserById(userId))
    // const [user, setUser] = useState(undefined)


    // useEffect(() => {
    //     getUser()
    // }, [userId])
    //
    // const getUser = async () => {
    //     console.log("this is user: ", user);
    //     setUser(user)
    // }

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
                            image={user.image}
                        />
                        <UserQualities
                            qualities = {user.qualities}
                        />
                        <UserProfession
                            profession={user.profession}
                        />
                        <UserCompletedMeetings
                            meetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <UserComments userId = {userId}/>
                        </CommentsProvider>
                    </div>
                </div>
            </div>
            : <Loader />
    )
}

export default UserPage