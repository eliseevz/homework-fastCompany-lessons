import React, {useEffect, useState} from "react"
import Users from "./layouts/users"
import api from "./API"
import Loader from "./components/Loader/Loader";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import NavBar from "./components/UI/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UserProfile from "./components/page/userPage/UserPage";
import EditUser from "./components/page/editUserPage/editUser";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ProfessionProvider} from "./hooks/useProfession";
import {QualitiesProvider} from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    const routing = (
        <AuthProvider>
            <ProfessionProvider>
                <QualitiesProvider>
                    <Switch>
                        <Route path="/users/:userId/edit" component={EditUser}/>
                        <Route path="/users/:userId?" component={Users}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/" exact component={Main}/>
                        <Redirect to="/"/>
                    </Switch>
                    <ToastContainer/>
                </QualitiesProvider>
            </ProfessionProvider>
        </AuthProvider>
)

    return (
        <BrowserRouter>
            <NavBar></NavBar>
            {routing}
        </BrowserRouter>
    )
}

export default App
