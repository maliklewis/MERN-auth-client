import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, singout} from '../auth/Helpers'

const Layout = ({children, match, history}) => {
    const isActive = path => {
        //match.path == /signup for example
        if (match.path === path) {
            return {color:'#000'};
        }
        else {
            return {color: '#fff'};
        }
    };
    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>
                    Home
                </Link>
            </li>

            {!isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                            Sign up
                        </Link>
                    </li>
                </Fragment>
            )}
            
            {isAuth() && isAuth().role === 'admin' && (
                <li>
                        <Link className="nav-link" style={isActive('/admin')} to='/admin'>
                            {isAuth().name}
                        </Link>
                    </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li>
                        <Link className="nav-link" style={isActive('/private')} to='/private'>
                            {isAuth().name}
                        </Link>
                    </li>
            )}

            {isAuth() && (
                    <li className="nav-item">
                        <span className="nav-link" style={{cursor: 'pointer', color:'#fff'}}
                        onClick={() => {
                            singout(() => {
                                history.push('/')
                            })
                        }}>
                        Sign Out
                        </span>
                    </li>
                    
            )}
            
        </ul>
    );
    return (
        <Fragment>
            {nav()}
            <div className="container vertical-center">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);