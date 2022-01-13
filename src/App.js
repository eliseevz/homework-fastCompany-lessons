import React, {useEffect} from "react"
import Users from "./layouts/users"
import {Router, Switch, Route, Redirect} from "react-router-dom"
import NavBar from "./components/UI/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import EditUser from "./components/page/editUserPage/editUser";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ProfessionProvider} from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import LogOut from "./layouts/logOut";
import history from "./utils/history";
import AppLoader from "./components/UI/hoc/appLoader";

const App = () => {

    const routing = (
            <ProfessionProvider>
                    <Switch>
                        <ProtectedRoute path="/users/:userId/edit" component={EditUser} />
                        <ProtectedRoute path="/users/:userId?" component={Users} />
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/logout" component={LogOut}/>
                        <Route path="/" exact component={Main}/>
                        <Redirect to="/"/>
                    </Switch>
                    <ToastContainer/>
            </ProfessionProvider>
)

    return (
        <AppLoader>
            <Router history={history}>
                <AuthProvider>
                    <div className="container">
                        <NavBar></NavBar>
                        {routing}
                    </div>
                </AuthProvider>
            </Router>
        </AppLoader>
    )
}

export default App
