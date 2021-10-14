import {
    ADD_POST,
    DELETE_POST,
    GET_ERRORS,
    GET_POSTS,
    GET_POST,
    POST_LOADING
} from './types'
import axios from 'axios'

//app post
const addPost = postData => dispatch => {
    axios.post('/api/post', postData)
    .then(res => {
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

const getPost = () => dispatch => {
    dispatch(setPostLoading())
    axios.get('/api/post')
    .then(res => {
        dispatch({
            type: GET_POSTS ,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    })
}

// get single post
// const getSinglePost = (id) => dispatch => {
//     dispatch(setPostLoading())
//     axios.get(`/api/post/${id}`)
//     .then(res => {
//         dispatch({
//             type: GET_POST ,
//             payload: res.data
//         })
//     })
//     .catch(err => {
//         dispatch({
//             type: GET_POST,
//             payload: null
//         })
//     })
// }


const getSinglePost = (id) => {
    return async dispatch => {
        dispatch(setPostLoading())
        try{
            const res = await axios
            axios.get(`/api/post/${id}`)
            .then(res => {
                dispatch({
                    type: GET_POST ,
                    payload: res.data
                })
            })
        }catch(err){
            dispatch({
                type: GET_POST,
                payload: null
            })
        }
    }
}

// delete post

const deletePost = id => dispatch => {
    axios.delete(`/api/post/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


// like post

const addLike = id => dispatch => {
    axios.post(`/api/post/like/${id}`)
    .then(res => {
        dispatch(getPost())
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// remove like
const removeLike = id => dispatch => {
    axios.post(`/api/post/unlike/${id}`)
    .then(res => {
        dispatch(getPost())
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// add comment

const addComment = (postId, commentData) => dispatch => {
    axios.post(`/api/post/comment/${postId}`, commentData)
    .then(res => {
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


//set loading state
const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

export {
    addPost,
    getPost,
    deletePost,
    addLike,
    removeLike,
    getSinglePost,
    addComment
}