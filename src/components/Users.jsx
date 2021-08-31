import React from "react"
import User from "./User"
import Phrase from "./Phrase"


const Users = ({users, renderPhrase, qualitiesHundler, removeHundler, getUserMark}) => {

    return (
            users.length > 0
                ?
                <>
                    <Phrase
                        renderPhrase={renderPhrase}
                        users = {users}
                    />
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Закладки</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <User
                                        getUserMark = {getUserMark}
                                        key = {index}
                                        user = {user}
                                        qualitiesHundler = {qualitiesHundler}
                                        removeHundler = {removeHundler}

                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>
                </>
                : <Phrase
                    renderPhrase={renderPhrase}
                    users = {users}
                    isNullUsers = {true}
                />


    )
}

export default Users
