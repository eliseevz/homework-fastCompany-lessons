import React from 'react';
import {getProfessionByIds, getProfessionsLoadingStatus} from "../../../store/professions";
import {useSelector} from "react-redux";

const UserProfession = ({profession}) => {

    const professionData = useSelector(getProfessionByIds(profession))
    const professionsLoading = useSelector(getProfessionsLoadingStatus())

    return (
        !professionsLoading
        ? <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Profession</span>
                    </h5>
                    <p className="card-text">
                        {professionData.name}
                    </p>
                </div>
            </div>
        : <p>loading</p>

    );
};

export default UserProfession;
