import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getSinglePost} from '../../actions/postActions'
import {useParams} from 'react-router-dom'
import Spinner from '../common/spinner'
import CommentForm from './CommentForm'
import DisplayComment from './DisplayComment'

const Post = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(getSinglePost(id))
    },[])
    const {post, loading} = useSelector(state => state.post)
    let postData;
    if(post === null || loading){
        postData = <Spinner/>
    }else{
        postData = (
            <div>
                <div className="card card-body mb-3">
                    <div className="row">
                        <div className="col-md-2">
                            <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                                alt="" />
                            </a>
                            <br />
                            <p className="text-center">{post.name}</p>
                        </div>
                        <div className="col-md-10">
                            <p className="lead">{post.text}
                            </p>
                        </div>
                    </div>
                </div>
                <CommentForm post = {post} />
                <DisplayComment post={post} />
            </div>
        )
    }

    return(
        <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {postData}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post