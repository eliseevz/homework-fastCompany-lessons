import React from "react"
import { useParams } from "react-router-dom"
// import UserProfile from "../components/page/userPage/UserPage";
// import UsersListPage from "../components/page/userListPage/UsersListPage";
import UserPage from "../components/page/userPage/UserPage";
import UsersListPage from "../components/page/userListPage";

const Users = () => {
    console.log('HELLO WORLD')
    const params = useParams()
    const {userId} = params
    console.log(userId)
    return (
        <>
            {userId ? <UserPage userId={userId}/> : <UsersListPage/>}
        </>
    )
}

export default Users