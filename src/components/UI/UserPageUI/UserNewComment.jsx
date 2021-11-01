import React, {useState, useEffect} from 'react';
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import api from "../../../API"
import {validator} from "../../../utils/validator";


const UserNewComment = ({pageId, comments, setComments}) => {

    const {fetchAll} = api.users
    const {add} = api.comments

    const dataInitialState = {
        userId: "",
        content: ""
    }

    const [data, setData] = useState(dataInitialState)
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState({})

    const validateConfig = {
        userId: {
            isRequired: {
                message: "Поле обязательно для ввода"
            }
        },
        content: {
            isRequired: {
                message: "Поле обязательно для ввода"
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validateConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        validate()
    }, [data])

    useEffect(() => {
        fetchAll()
            .then(data => setUsers({...data}))
            .catch(err => console.log(err))
    }, [])

    const handleChange = (target) => {
        console.log(target, " target in handle")
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
        console.log(data, ' this is data')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const uploadData = {
            ...data,
            userId: data.userId._id,
            pageId
        }
        if (validate()) {
            const result = add(uploadData)
            setData(dataInitialState)
            result
                .then(data => setComments((prevState) => ([...prevState, data])))
        }
    }

    return (
        <div>
            <h2>new com</h2>
            <form onSubmit={submitHandler} >
                <SelectField
                    label = "Выберите пользователя"
                    defaultOption="choose..."
                    value={data.userId}
                    onChange={handleChange}
                    options={{...users}}
                    error={errors.userId}
                    name="userId"

                />
                <TextField
                    textarea={true}
                    rows={3}
                    onChange={handleChange}
                    label="Ваш комментарий"
                    type="text"
                    name="content"
                    value={data.content}
                    error={errors.content}
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default UserNewComment;
