import React from 'react';
import {useProfessions} from "../../../hooks/useProfession";

const UserProfession = ({profession}) => {

    const {getProfession} = useProfessions()
    const professionData = getProfession(profession)
    console.log(professionData, ' Имя профессии')

    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Profession</span>
                </h5>
                <p className="card-text">
                    {professionData.name}
                </p>
            </div>
        </div>
    );
};

export default UserProfession;
