import axios from 'axios'
import { useDispatch } from 'react-redux'
import {GET_PROFILE,
    GET_ERRORS, 
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING, 
    SET_CURRENT_USER,
    GET_PROFILES} from './types'




const getCurrentProfile = () => {
    return async dispatch => {
        dispatch(setProfileLoading())
        try{
            const res = await axios
                .get('/api/profile')
                .then(res => {
                    dispatch({
                        type: GET_PROFILE,
                        payload: res.data
                    })
                }) 
        }catch(err){
            dispatch({
                type:GET_PROFILE,
                payload: {}
            })
        }
    }
}

//Loading
export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    }
}


//Clear Profile
const clearCurrentProfile = () => {
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}

//create profile

const createProfile = (profileData) => dispatch => {
    axios
    .post('/api/profile', profileData)
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

const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure')){
        axios
            .delete('/api/profile')
            .then(res => {
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}

const addExp = (expData) => dispatch => {
    axios.post('/api/profile/experience',expData)
    .then(res => window.location='/dashboard')
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}
const addEdu = (eduData) => dispatch => {
    axios.post('/api/profile/education',eduData)
    .then(res => window.location='/dashboard')
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

const getProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios
    .get('/api/profile/all')
    .then(res => {
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    })
}


const getProfileByHandle = (handle) => {
    return async dispatch => {
        dispatch(setProfileLoading())
        try{
            const res = await axios
                .get(`/api/profile/handle/${handle}`)
                .then(res => {
                    dispatch({
                        type: GET_PROFILE,
                        payload: res.data
                    })
                }) 
        }catch(err){
            dispatch({
                type:GET_PROFILE,
                payload: null
            })
        }
    }
}



export {
            getCurrentProfile,
            clearCurrentProfile, 
            createProfile, 
            deleteAccount,
            addExp,
            addEdu,
            getProfiles,
            getProfileByHandle
        }