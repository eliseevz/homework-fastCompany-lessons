import React from "react"
import { useParams } from "react-router-dom"
// import UserProfile from "../components/page/userPage/UserPage";
// import UsersListPage from "../components/page/userListPage/UsersListPage";
import UserPage from "../components/page/userPage/UserPage";
import UsersListPage from "../components/page/userListPage";
import {UserProvider} from "../hooks/useUsers";

const Users = () => {

    console.log('Привет я появился')

    const params = useParams()
    const {userId} = params
    console.log(userId)
    return (
        <>
            <UserProvider>
                {userId ? <UserPage userId={userId}/> : <UsersListPage/>}
            </UserProvider>
        </>
    )
}

export default Users