import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import {isAuth, getCookie, singout, getLocalStorage, updateUser} from '../auth/Helpers'
//pass messages to user
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Private = ({history}) => {
    const [values, setValues] = useState({
        role: '',
        name: "",
        email: "",
        password: "",
        buttonText: "Update",
    });

    //get token from local storage to populate page
    const token = getCookie('token');


    //empty array means this will run when the component mounts and unmounts
    //if you pass a value (ie: name) it will only run when name is changed
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${getLocalStorage('server-url')}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PRIVATE PROFILE RETRIEVAL SUCCESS', response);
            const {role, name, email} = response.data;
            setValues({...values, role, name, email})
        })
        .catch(error => {
            console.log('PRIVATE PROFILE RETRIEVAL ERROR', error.response.data.error);
            //401 = unautherized error
            if(error.response.status === 401){
                singout(() => {
                    history.push('/');
                })
            }
        })
    };

    const {role, name, email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        //console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    };

    const clickSubmit = event => {
        //stop the page from reloading
        event.preventDefault()
        setValues({...values, buttonText: 'Updating'})
        axios({
            method: 'PUT',
            url: `${getLocalStorage('server-url')}/user/update`,
            data: {name, password},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
            updateUser(response, () => {
                setValues({...values, buttonText: 'Update'});
                toast.success("Profile updated successfully!");
            });
        })
        .catch(error => {
            console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data);
            setValues({...values, buttonText: 'Update'});
            toast.error(error.response.data.error);
        });
    };

    const updateForm = () => (
        <form>
        <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled/>
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
            <div className="col-d-6 offset-md-3">
            <ToastContainer />
            <h1 className="pt-5 text-center">Private</h1>
            <p className="lead text-center"> Profile Update</p>
            {updateForm()}
            </div>
        </Layout>
    );
};
export default Private;