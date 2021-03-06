import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
//pass messages to user
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {authenticate, isAuth, getLocalStorage} from './Helpers'
import Google from './Google'

const Signin = ({history}) => {
    //history comes from browserRouter in Routes which all components are wrapped in
    const [values, setValues] = useState({
        email: "",
        password: "",
        buttonText: "Submit",
    });

    const {email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        //console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        });
    }

    const clickSubmit = event => {
        //stop the page from reloading
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${getLocalStorage('server-url')}/signin`,
            data: {email, password}
        })
        .then(response => {
            console.log('SIGNIN SUCCESS', response);
            //clean up values to nothing
            authenticate(response, () => {
                setValues({...values, email:'', password:'', buttonText: 'Submitted'});
                //toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
            });
            
        })
        .catch(error => {
            console.log('SIGNIN ERROR', error.response.data);
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    const signinForm = () => (
        <form>
            
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button> 
            </div>
        </form>
    )


    return (
        <Layout>
            <div className="col-d-6">
            <ToastContainer />
            {isAuth() ? <Redirect to="/"/> : null}
            <h1 className="p-5 text-center">SignIn</h1>
            <Google informParent={informParent}/>
            {signinForm()}
            <Link to="/auth/password/forgot">Forgot password?</Link>
            </div>
        </Layout>
    );
};

export default Signin;