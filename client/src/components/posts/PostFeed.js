import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {deletePost, addLike, removeLike} from '../../actions/postActions'
import classnames from 'classnames'

const PostFeed = (props) => {
    const dispatch = useDispatch()
    const onDelete = (id) => {
        dispatch(deletePost(id))
        console.log(id, 'got deleted')
    }
    const {user:{id}} = useSelector(state => state.auth)

    function findUser(likes){
        if(likes.filter(like => like.user === id).length > 0){
            return true
        }else{
            return false
        }
    }
    
    return (
        <div >
        {props.posts.map((post) => {
            let mediaData
            if(post.mediaType === 'image'){
                mediaData = <img src={post.mediaLink} style={{
                    width: "250px",
                    height: "250px"
                }} alt="" />
            }
            else if(post.mediaType === 'pdf'){
                mediaData = <a href={post.mediaLink}>Open PDF</a>
            }
            else if(post.mediaType === 'word'){
                mediaData = <a href={post.mediaLink}>Download word file</a>
            }
            else if(post.mediaType === 'audio'){
                mediaData = <audio controls src={post.mediaLink}></audio>
            }
            else if(post.mediaType === 'video'){
                mediaData = <video controls height="250px" width="500px" src={post.mediaLink}></video>
            }
            return(
                <div  key={post._id}>
                    <div >
                        <div>
                        <a href="profile.html">
                            <img src={post.avatar}
                            alt="" />
                        </a>
                        <br />
                        <p>{post.name}</p>
                        </div>
                        <div>
                        <p>{post.text}</p>
                        <p>{mediaData}</p>
                        <button 
                            type="button" 
                            onClick={() => {
                                dispatch(addLike(post._id))
                            }} >
                            +
                            <i className={classnames('fa fa-thumbs-up',{
                                'text-info': findUser(post.likes)
                            })}></i>
                            <span>{post.likes.length }</span>
                        </button>
                        <button 
                            type="button" 
                            onClick={() => {
                                dispatch(removeLike(post._id))
                            }} >
                            <i></i>
                        </button>
                        {
                            post.user === id
                                ?<button 
                                type="button"
                                onClick={() => {onDelete(post._id)}}
                                >
                                    <i>Delete</i>
                                </button>
                                :null
                        }
                        </div>
                    </div>
        </div>
            )
        })}

      </div>
    )
}

export default PostFeed