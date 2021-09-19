import React, {useEffect, useState} from "react"
import Users from "./components/Users"
import api from "./API"
import Loader from "./components/Loader/Loader";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UserProfile from "./components/UserProfile";

const App = () => {

    const [users, setUsers] = useState()

    useEffect(()=> {
        api.users.fetchAll()
            .then(data => {
                setUsers(data)
            })

    },[App])
    
    const routing = (
        <Switch>
            <Route path="/users/:id" component={UserProfile}/>
            <Route path="/users" component={(params) => users ? <Users params={params} users={users} setUsers={setUsers}></Users> : <Loader/>} />
            <Route path="/login" component={Login}/>
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
