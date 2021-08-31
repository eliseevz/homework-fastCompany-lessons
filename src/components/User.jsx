import React from "react"
import Username from "./Username";

const User = ({user, qualitiesHundler, removeHundler, getUserMark}) => {
    return (
        <tr className="personElement" id={user._id}>
            <Username
                user = {user}
            />
            <td>{qualitiesHundler(user.qualities)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <button onClick={() => {getUserMark(user._id)}}>
                    {user.isMarked
                        ? <i className="bi bi-bookmark-fill"></i>
                        : <i className="bi bi-bookmark"></i>
                    }

                </button>
            </td>
            <td>
                <button
                    onClick={(event) => {removeHundler(event)}}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default User