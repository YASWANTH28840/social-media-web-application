import {GET_ERRORS,SET_CURRENT_USER} from './types'
import axios from 'axios'
import {setAuthToken} from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import {clearCurrentProfile} from './profileActions'
const registerUser = userData => dispatch => {
    axios
    .post('/api/user/register', userData)
    .then(res => {
        window.location = "/dashboard";
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

const loginUser = (userData) => (dispatch) => {
    axios.post('/api/user/login',userData)
    .then(res => {
        // save to local storage
        const {token} = res.data;
        //set token to localstorage
        localStorage.setItem('jwtToken',token);
        //set token to auth header
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded))
        window.location = "/dashboard";
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


const logUserOut = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}


export {registerUser,loginUser,setCurrentUser, logUserOut};