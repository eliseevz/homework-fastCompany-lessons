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
import {ProfessionProvider} from "./hooks/useProfession";
import {QualitiesProvider} from "./hooks/useQualities";

const App = () => {
    const routing = (
        <Switch>
            <QualitiesProvider>
                <ProfessionProvider>
                    <Route path="/users/:userId/edit" component={EditUser}/>
                    <Route path="/users/:userId?" component={Users}/>
                    <Route path="/login/:type?" component={Login}/>
                </ProfessionProvider>
            </QualitiesProvider>
            <Route path="/" exact component={Main}/>
            <Redirect to="/"/>
            <ToastContainer />
        </Switch>
    )

    return (
        <BrowserRouter>
                <NavBar></NavBar>
                { routing }
        </BrowserRouter>
    )
}

export default App
