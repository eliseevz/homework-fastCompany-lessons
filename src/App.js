import React, {useEffect} from "react"
import Users from "./layouts/users"
import {Router, Switch, Route, Redirect} from "react-router-dom"
import NavBar from "./components/UI/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import EditUser from "./components/page/editUserPage/editUser";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/common/ProtectedRoutes";
import LogOut from "./layouts/logOut";
import history from "./utils/history";
import AppLoader from "./components/UI/hoc/appLoader";

const App = () => {

    const routing = (
        <>
            <Switch>
                <ProtectedRoute path="/users/:userId/edit" component={EditUser} />
                <ProtectedRoute path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login}/>
                <Route path="/logout" component={LogOut}/>
                <Route path="/" exact component={Main}/>
                <Redirect to="/"/>
            </Switch>
            <ToastContainer/>
        </>
)

    return (
        <AppLoader>
            <Router history={history}>
                <div className="container">
                    <NavBar></NavBar>
                    {routing}
                </div>
            </Router>
        </AppLoader>
    )
}

export default App
