import React from "react"
import Username from "./Username"

// eslint-disable-next-line react/prop-types
const User = ({ user, qualitiesHundler, removeHundler, getUserMark }) => {
    return (
        // eslint-disable-next-line react/prop-types
        <tr className="personElement" id={user._id}>
            <Username user={user} />
            {/* eslint-disable-next-line react/prop-types */}
            <td>{qualitiesHundler(user.qualities)}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{user.profession.name}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{user.completedMeetings}</td>
            {/* eslint-disable-next-line react/prop-types */}
            <td>{user.rate}/5</td>
            <td>
                <button
                    onClick={() => {
                        // eslint-disable-next-line react/prop-types
                        getUserMark(user._id)
                    }}
                >
                    {/* eslint-disable-next-line react/prop-types */}
                    {user.isMarked
                        ? (
                            <i className="bi bi-bookmark-fill"></i>
                        )
                        : (
                            <i className="bi bi-bookmark"></i>
                        )}
                </button>
            </td>
            <td>
                <button
                    onClick={(event) => {
                        removeHundler(event)
                    }}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default User
