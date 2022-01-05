import React, {useEffect, useState} from 'react';
import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import {useQualities} from "../../hooks/useQualities";
import {useProfessions} from "../../hooks/useProfession";
import {useAuth} from "../../hooks/useAuth";
import {useHistory} from "react-router-dom"

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    })
    const [errors, setErrors] = useState({})
    const {qualities} = useQualities()
    // const qualitiesList = qualities.map(q => ({label: q.name, value: q._id}))
    const {professions} = useProfessions()
    // const professionsList = professions.map(p => ({name: p.name, value: p}))

    const history = useHistory()

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

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
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно быть хотя бы 2 символа",
                value: 2
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
        setData((prevState => ({
            ...prevState,
            [target.name]: target.value
        })))
    }

    const {signUp} = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const isValid = validate()
        if (!isValid) return
        // const newData = {
        //     ...data,
        //     profession: data.profession._id
        // }
        try {
            await signUp(data)
            history.push("/")
        } catch (e) {
            setErrors(e)
        }
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
                label="Имя"
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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
                name="profession"
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