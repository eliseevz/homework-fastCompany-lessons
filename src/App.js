import React, {useEffect, useState} from "react"
import Users from "./layouts/users"
import api from "./API"
import Loader from "./components/Loader/Loader";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import NavBar from "./components/UI/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UserProfile from "./components/page/userPage/UserPage";

const App = () => {
    const routing = (
        <Switch>
            <Route path="/users/:userId?" component={Users}/>
            {/*<Route path="/users" component={(params) => users ? <Users params={params} users={users} setUsers={setUsers}></Users> : <Loader/>} />*/}
            <Route path="/login/:type?" component={Login}/>
            <Route path="/" exact component={Main}/>
            <Redirect to="/"/>
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
