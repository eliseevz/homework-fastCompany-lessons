import React, {useEffect, useState} from "react"
import api from "../../../API"
import Loader from "../../Loader/Loader";
import {Link} from "react-router-dom";

const UserPage = ({userId}) => {

    const {getById} = api.users

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
            ? <div>
                <h1> {user.name} </h1>
                <h2>Профессия: {user.profession.name}</h2>
                <div>
                    {user.qualities.map((item, index) => {
                        return (
                            <span
                                key={index}
                                className={`badge bg-${item.color}`}
                                style={{fontSize: 15, margin: 5}}
                            >
                                {item.name}
                            </span>)
                    })}
                </div>
                <p>Встреч: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <Link className="btn btn-secondary" to="/users"> Все пользователи</Link>
            </div>
            : <Loader />
    )
}

export default UserPage