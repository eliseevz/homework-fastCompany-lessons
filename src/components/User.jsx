import React from "react"
import PropTypes from "prop-types"

const User = ({
    user,
    qualitiesHundler,
    removeHundler,
    getUserMark,
    selectedProf
}) => {
    return (
        <tr className="personElement" id={user._id}>
            <th scope="row">{user.name}</th>
            <td>{qualitiesHundler(user.qualities)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
            </td>
            <td>
                {/*<button*/}
                {/*    onClick={(event) => {*/}
                {/*        removeHundler(event)*/}
                {/*    }}*/}
                {/*    className="btn btn-danger"*/}
                {/*>*/}
                {/*    Delete*/}
                {/*</button>*/}
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
