import React, {useState} from "react"
import {useParams} from "react-router"
import LoginForm from "../components/UI/loginForm";
import RegisterForm from "../components/UI/registerForm";

const Login = () => {
    const {type} = useParams()
    const [formType, setFormType] = useState(type === "register" ? type : "login")



    const toggleFormType = () => {
        setFormType(prevState=>prevState==="register"?"login":"register")
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {
                        formType === "register"
                        ? <>
                                <h3 className="mb-4">Регистрация</h3>
                                <RegisterForm/>
                                <p>Alrady have account? <a role="button" onClick={toggleFormType}>Sign in</a></p>
                        </>
                        : <>
                            <h3 className="mb-4">Логин</h3>
                            <LoginForm/>
                            <p>Dont have account? <a role="button" onClick={toggleFormType}>Sign up</a></p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login