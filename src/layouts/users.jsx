import React from "react"
import { useParams } from "react-router-dom"
import UserPage from "../components/page/userPage/UserPage";
import UsersListPage from "../components/page/userListPage";
import UsersLoader from "../components/UI/hoc/usersLoader";

const Users = () => {

    const params = useParams()
    const {userId} = params

    return (
        <>
            <UsersLoader>
                    {userId ? <UserPage userId={userId}/> : <UsersListPage/>}
            </UsersLoader>
        </>
    )
}

export default Users