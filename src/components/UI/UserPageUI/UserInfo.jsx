import React from 'react';
import {useHistory} from "react-router-dom"
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../../../store/users";

const UserInfo = ({name, rate, profession, userId, image}) => {

    const history = useHistory()
    const currentUser = useSelector(getCurrentUserData())

    return (
        <div className="card mb-3">
            <div className="card-body">
                {
                    currentUser._id === userId &&
                        <button onClick={() => history.push(`/users/${userId}/edit`)}
                             className="position-absolute top-0 end-0 btn btn-light btn-sm">
                            <i className="bi bi-gear"></i>
                        </button>
                }
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width={150}
                        height={150}
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession.name}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
