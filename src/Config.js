import {setLocalStorage} from './auth/Helpers'

export const setUrl = () => {
    let serverUrl = process.env.NODE_ENV === "development" ? 'http://localhost:8000/api' : 'http://68.183.207.128/api';
    setLocalStorage("server-url", serverUrl)
}

export const apis = {
    GOOGLE_CLIENT_ID: '1096628844880-2r2q4ganf8vbrk6s5636gahdu27qfip1.apps.googleusercontent.com'
}