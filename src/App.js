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
import ProtectedRoute from "./components/common/ProtectedRoutes";
import LogOut from "./layouts/logOut";

const App = () => {
    const routing = (

            <ProfessionProvider>
                <QualitiesProvider>
                    <Switch>
                        {/*<Route path="/users/:userId/edit" component={EditUser}/>*/}
                        <ProtectedRoute path="/users/:userId/edit" component={EditUser} />
                        <ProtectedRoute path="/users/:userId?" component={Users} />
                        {/*<Route path="/users/:userId?" component={Users}/>*/}
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/logout" component={LogOut}/>
                        <Route path="/" exact component={Main}/>
                        <Redirect to="/"/>
                    </Switch>
                    <ToastContainer/>
                </QualitiesProvider>
            </ProfessionProvider>
)

    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="container">
                    <NavBar></NavBar>
                    {routing}
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
