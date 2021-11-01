import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom"
import api from "../../../API/fake.api/user.api"
import proffessionsAPI from "../../../API/fake.api/professions.api"
import qualitiesAPI from "../../../API/fake.api/qualities.api"
import TextField from "../../common/form/textField";
import MultiSelectField from "../../common/form/multiSelectField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import {validator} from "../../../utils/validator";

const EditUser = () => {

    const history = useHistory()

    const {update, getById} = api
    const { fetchAll:fetchAllProf } = proffessionsAPI
    const { fetchAll:fetchAllQual } = qualitiesAPI
    const {userId} = useParams();

    const [userData, setUserData] = useState()
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        getById(userId)
            .then(data => {
                console.log(data, " in data")
                setUserData(data)
            })
            .catch((err) => console.log(err))
        fetchAllProf()
            .then(dataProf => {
                setProfessions(dataProf)
            })
            .catch((err) => console.log(err))
        fetchAllQual()
            .then(dataQual => {
                setQualities(dataQual)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (userData) {
            console.log(userData, " and next validate")
            validate()
        }
    }, [userData])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Пароль обязательна для заполнения"
            },
        },
        profession: {
            isRequired: {
                message: "Данное поле обязательно для заполнения"
            }
        }
    }

    const validate = () => {
        const errors = validator(userData, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (target) => {
        console.log(target, ' target')
        setUserData((prevState => ({
            ...prevState,
            [target.name]: target.value
        })))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (isValid) {
            console.log("ПУШИМ ОБНОВЛЕНИЯ")
            console.log(userData, " out data")
            update(userId, userData)
            history.push(`/users/${userId}`)
        }
    }

    return (
        <div>
            {userData
                ?  <div className="container mt-5">
                    <button
                        onClick={() => history.push(`/users/${userId}`)}
                        className="btn btn-primary"
                    >
                        Назад
                    </button>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Ваше имя"
                                    value={userData.name}
                                    name="name"
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Ваша почта"
                                    value={userData.email}
                                    name="email"
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    value={userData.profession}
                                    options={professions}
                                    label="Выберите вашу профессию"
                                    defaultOption="choose..."
                                    onChange={handleChange}
                                    name={"profession"}
                                />
                                <RadioField
                                    options={[
                                        {name: "Male", value: "male"},
                                        {name: "Female", value: "female"},
                                        {name: "Other", value: "other"},
                                    ]}
                                    value={userData.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    onChange={handleChange}
                                    options={qualities}
                                    value={userData.qualities}
                                    name="qualities"
                                    label="Выберите свои качества"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                : <h2>loading</h2>
            }
        </div>
    );
};

export default EditUser;
