import React, {useState} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
//pass messages to user
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {getLocalStorage} from './Helpers'

const Forgot = ({history}) => {
    //history comes from browserRouter in Routes which all components are wrapped in
    const [values, setValues] = useState({
        email: "",
        buttonText: "Request",
    });

    const {email, buttonText} = values;

    const handleChange = (name) => (event) => {
        //console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    };

    const clickSubmit = event => {
        //stop the page from reloading
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${getLocalStorage('server-url')}/forgot-password`,
            data: {email}
        })
        .then(response => {
            console.log('FORGOT PASSWORD SUCCESS', response);
            setValues({...values, buttonText: 'Requested'});
            toast.success(response.data.message);
            
        })
        .catch(error => {
            console.log('FORGOT PASSWORD ERROR', error.response.data.error);
            setValues({...values, buttonText: 'Request'});
            toast.error(error.response.data.error);
        })
    };

    const forgotForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
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
            <h1 className="p-5 text-center">Forgot Password</h1>
            {forgotForm()}
            </div>
        </Layout>
    );
};

export default Forgot;