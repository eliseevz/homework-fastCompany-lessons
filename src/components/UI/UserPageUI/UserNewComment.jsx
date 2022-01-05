import React, {useState, useEffect} from 'react';
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import api from "../../../API"
import {validator} from "../../../utils/validator";
import {useComments} from "../../../hooks/useComments";
import {useAuth} from "../../../hooks/useAuth";


const UserNewComment = ({pageId, comments, setComments}) => {

    const {currentUser} = useAuth()

    const dataInitialState = {
        userId: currentUser._id,
        content: ""
    }

    const [data, setData] = useState(dataInitialState)
    const [errors, setErrors] = useState({})

    const {createComment} = useComments()

    const validateConfig = {
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

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const clearForm = () => {
        setData(prevState => ({...prevState, content: ""}))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        createComment(data)
        clearForm()
    }

    return (
        <div>
            <h2>new com</h2>
            <form onSubmit={submitHandler} >
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
