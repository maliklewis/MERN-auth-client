import cookie from 'js-cookie'

//set in cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
};


//remove from cookie 
export const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
};

//get from cookie such as stored token
export const getCookie = (key) => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
};

//set in local storage
//must be saved as JSON data and parsed in the backend on retreival 
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
};

//remove from local storage on signout
export const removeLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
};

//get item from local storage
export const getLocalStorage = (key) => {
    if (window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key))
    }
}

//authenticate user by passing data to cookie and local storage during signin
export const authenticate = (response, next) => {
    //console.log(reponse);
    //let serverUrl = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "maliklewis.ca"
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    //setLocalStorage('server-url', serverUrl);
    next();
};

//access user info from local storage

//ensure we have access to main window object in browser
export const isAuth = () => {
    if (window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if (cookieChecked){
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            }
            else {
                return false;
            }
        }
    }
};

export const singout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}