import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from './Helpers'
import Private from '../core/Private'

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render = {
        props => isAuth() ? <Component {...props}/> : <Redirect to={{
            pathname: '/signin',
            state: {from: props.location}
        }}/>
    }>

    </Route>
)

export default PrivateRoute;