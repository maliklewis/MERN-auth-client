import React from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import 'react-toastify/dist/ReactToastify.min.css'
import {getLocalStorage} from './Helpers'

const Google = ({informParent = f => f}) => {
    const responseGoogle = (response) => {
        console.log(response.tokenId);
        axios({
            method: 'POST',
            url: `${getLocalStorage('server-url')}/google-login`,
            data: {idToken: response.tokenId}
        })
        .then(response =>{
            console.log('GOOGLE SIGNIN SUCCESS', response);
            //inform parent component
            informParent(response);
        })
        .catch(error => {
            console.log('GOOGLE SINGIN ERROR', error.response);
        })
    }
    return (
        <div className='pb-3'>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-danger btn-block">
                        <i className="fab fa-google"></i>
                        </button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
    
}

export default Google;