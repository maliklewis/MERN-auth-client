import {setLocalStorage} from './auth/Helpers'

export const setUrl = () => {
    let serverUrl = process.env.NODE_ENV === "development" ? 'http://localhost:8000/api' : 'ec2-18-219-242-234.us-east-2.compute.amazonaws.com';
    setLocalStorage("server-url", serverUrl)
}

export const apis = {
    GOOGLE_CLIENT_ID: '1096628844880-2r2q4ganf8vbrk6s5636gahdu27qfip1.apps.googleusercontent.com'
}