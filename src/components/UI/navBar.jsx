import React from "react"
import {NavLink} from "react-router-dom";

const NavBar = (props) => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Main</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
            </li>
        </ul>
    )
}

export default NavBar