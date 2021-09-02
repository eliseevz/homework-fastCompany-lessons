import React from "react"

// eslint-disable-next-line react/prop-types
const Username = ({ user }) => {
    // eslint-disable-next-line react/prop-types
    return <th scope="row">{user.name}</th>
}

export default Username
