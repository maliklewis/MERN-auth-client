import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Activate from './auth/Activate'
import Private from './core/Private'
import Admin from './core/Admin'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import {setLocalStorage} from './auth/Helpers'

const setUrl = () => {
    let serverUrl = process.env.NODE_ENV === "development" ? 'http://localhost:8000/api' : 'maliklewis.ca/api';
    setLocalStorage("server-url", serverUrl)
    console.log(serverUrl)
}

const Routes = () => {
    return (
        <BrowserRouter>
        {setUrl()}
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <AdminRoute path="/admin" exact component={Admin} />
                <PrivateRoute path="/private" exact component={Private} />
                
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;