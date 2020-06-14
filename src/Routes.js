import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'
import Activate from './auth/Activate'
import Private from './core/Private'
import Admin from './core/Admin'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import {setUrl} from './Config'
//import {setLocalStorage} from './auth/Helpers'

// const setUrl = () => {
//     let serverUrl = process.env.NODE_ENV === "development" ? 'http://localhost:8000/api' : 'http://68.183.207.128/api';
//     setLocalStorage("server-url", serverUrl)
// }

const Routes = () => {
    return (
        <BrowserRouter>
        {setUrl()}
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                <AdminRoute path="/admin" exact component={Admin} />
                <PrivateRoute path="/private" exact component={Private} />
                
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;