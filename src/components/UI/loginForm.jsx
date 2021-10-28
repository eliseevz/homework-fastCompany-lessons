import React, {useEffect, useState} from 'react';
// import {validator} from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from 'yup';

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        // const errors = validator(data, validatorConfig)
        validateScheme.validate(data).then(()=>setErrors({})).catch((err) => setErrors({[err.path]: err.message}))
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0
    console.log(isValid, " is valid")

    let validateScheme = yup.object().shape({
        password: yup.string().required("пароль обязателен для заполнения")
            .matches(/(?=.*[A-Z])/, "Пароль должен содержать заглавную букву")
            .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одну цифру")
            .matches(/(?=.*[!@*$%^&*])/, "Пароль должен содержать один из специальных символов !@*$%^&*")
            .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
        email: yup.string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно")
    })

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен некорректно"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Пароль обязательна для заполнения"
    //         },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одну цифру"
    //         },
    //         min: {
    //             message: "Пароль должен состоять минимум из 8 символов",
    //             value: 8
    //         }
    //     },
    // }

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData((prevState => ({
            ...prevState,
            [target.name]: target.value
        })))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
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
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
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
};

export default LoginForm;
