import React from "react"
import {NavLink} from "react-router-dom";
import NavProfile from "./NavProfile";
import {useSelector} from "react-redux";
import {getLoginStatus} from "../../store/users";

const NavBar = () => {
    const isLoggedIn = useSelector(getLoginStatus())
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">Main</NavLink>
                    </li>

                    {
                        isLoggedIn && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">Users</NavLink>
                            </li>
                        )
                    }

                </ul>
                <div className="d-flex">
                    { isLoggedIn
                        ? <NavProfile/>
                        : <NavLink className="nav-link" to="/login">Login</NavLink>
                    }

                </div>
            </div>
        </nav>
    )
}

export default NavBar