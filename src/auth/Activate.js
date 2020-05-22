import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
//pass messages to user
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt from 'jsonwebtoken';

const Activate = ({match, history}) => {
    const [values, setValues] = useState({
        name: "",
        token: "",
        show: true,
    });
    //if second argument array is empty, any time anything in the state changes the useEffect function will run
    //if you add a variable (ie. [name], it will only run when name is changed)
    useEffect(() => {
        let token = match.params.token;
        console.log(token);
        let {name} = jwt.decode(token);
        if (token) {
            setValues({...values, name, token});
        }
    }, []);

    const {name, token, show} = values;

    const clickSubmit = event => {
        //stop the page from reloading
        event.preventDefault()
        //setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        })
        .then(response => {
            console.log('ACTIVATION SUCCESS', response);
            //clean up values to nothing
            setValues({...values, show:false});
            toast.success(response.data.message);
            history.push('/');
        })
        .catch(error => {
            console.log('ACTIVATION ERROR', error.response.data.error);
            //setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    const activationLink = () => (
        <div className="text-center">
            <h1 className="p-5">Hey {name}, ready to activate you account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate
            </button>
        </div>
    )

    return (
        <Layout>
            <div className="col-d-6 offset-md-3">
            <ToastContainer />
            {activationLink()}
            </div>
        </Layout>
    );
};

export default Activate;