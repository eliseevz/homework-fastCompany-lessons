import React, {useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {generateAvatarURL} from "../../utils/Avatar";
import {Link} from "react-router-dom";

const NavProfile = () => {

    const {currentUser} = useAuth()
    const [show, setShow] = useState(false)

    const toggleMenu = () => {
        setShow(prevState => !prevState)
    }

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">
                    {currentUser.name}
                    <img src={currentUser.image} alt="" height="40" className="img-responsive rounded-circle ms-2"/>
                </div>
            </div>
            {
                show && <div className="w-100 dropdown-menu show">
                    <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
                    <Link to="/logout" className="dropdown-item">Logout</Link>
                </div>
            }
        </div>
    );
};

export default NavProfile;
