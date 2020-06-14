import React, {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken'
import Layout from '../core/Layout'
import axios from 'axios'
//pass messages to user
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {getLocalStorage} from './Helpers'

const Reset = ({match}) => { //match to access url variable (available from react-router-dom)
    //history comes from browserRouter in Routes which all components are wrapped in
    const [values, setValues] = useState({
        name: "",
        newPassword: "",
        token: "",
        buttonText: "Reset",
    });
    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);
        if (token) {
            setValues({...values, name, token});
        }
    }, [])
    const {name, token, newPassword, buttonText} = values;

    const handleChange = event => {
        //adds the password to values when the field is changed
        setValues({...values, newPassword: event.target.value})
    };

    const clickSubmit = event => {
        //stop the page from reloading
        event.preventDefault()
        setValues({...values, buttonText: 'Resetting'})
        axios({
            method: 'PUT',
            url: `${getLocalStorage('server-url')}/reset-password`,
            data: {
                newPassword,
                reset_link: token
            }
        })
        .then(response => {
            console.log('RESET PASSWORD SUCCESS', response);
            setValues({...values, buttonText: 'Reset'});
            toast.success(response.data.message);
            
        })
        .catch(error => {
            console.log('RESET PASSWORD ERROR', error.response.data.error);
            setValues({...values, buttonText: 'Reset'});
            toast.error(error.response.data.error);
        })
    };

    const resetForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange} value={newPassword} type="password" className="form-control" required/>
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
            <h1 className="p-5 text-center">Reset password for account {name}</h1>
            {resetForm()}
            </div>
        </Layout>
    );
};

export default Reset;