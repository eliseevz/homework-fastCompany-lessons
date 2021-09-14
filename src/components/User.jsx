import React from "react"
import Username from "./Username"
import PropTypes from "prop-types"

// eslint-disable-next-line react/prop-types
const User = ({
    user,
    // eslint-disable-next-line react/prop-types
    qualitiesHundler,
    // eslint-disable-next-line react/prop-types
    removeHundler,
    // eslint-disable-next-line react/prop-types
    getUserMark,
    // eslint-disable-next-line react/prop-types
    selectedProf
}) => {
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
                        getUserMark(user._id)
                    }}
                >
                    {user.isMarked ? (
                        <i className="bi bi-bookmark-fill"></i>
                    ) : (
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

User.propTypes = {
    user: PropTypes.object,
    selectedProf: PropTypes.object,
    qualitiesHundler: PropTypes.func,
    removeHundler: PropTypes.func,
    getUserMark: PropTypes.func
}

export default User
