import React, {useEffect, useState} from 'react';
import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../API"
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    })
    const [professions, setProfessions] = useState()
    const [errors, setErrors] = useState({})
    const [qualities, setQualities] = useState({})


    useEffect(() => {
        console.log("useEffect started")
        api.professions.fetchAll().then((data) => {
            setProfessions(data)
        })
        api.qualities.fetchAll().then((data) => {
            setQualities(data)
        })
    }, [])


    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0
    console.log(isValid, " is valid")

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязательна для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Данное поле обязательно для заполнения"
            }
        },
        licence: {
            isRequired: {
                message: "Соглашение необходимо"
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])


    const handleChange = (target) => {
        console.log(target, ' this is target')
        setData((prevState => ({
            ...prevState,
            [target.name]: target.value
        })))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data, ' data out form')
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                value={data.profession}
                label="Выберите вашу профессию"
                error={errors.profession}
                defaultOption="Choose.."
                options={professions}
                onChange={handleChange}
            />
            <RadioField
                options={[
                    {name: "Male", value: "male"},
                    {name: "Female", value: "female"},
                    {name: "Other", value: "other"},
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                name="qualities"
                label="Выберите свои качества"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a href="">лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
            >
                Отправить
            </button>
        </form>
    )
}

export default RegisterForm