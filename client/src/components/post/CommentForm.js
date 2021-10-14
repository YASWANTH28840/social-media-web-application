import React, { useState } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFeildGroup'
import {addPost} from '../../actions/postActions'
import {useSelector, useDispatch} from 'react-redux'
import {addComment} from '../../actions/postActions'


const CommentForm = (props) => {

    const [text, setText] = useState('')
    let errors = useSelector(state => state.errors)
    const {user:{name, avatar}} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const onSubmit = (e) => {
        e.preventDefault()
        const newComment = {
            text ,
            name,
            avatar
        }
        console.log(newComment)
        dispatch(addComment(props.post._id, newComment))
        setText('')
    }
    return (
        <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a comment...
              </div>
              <div className="card-body">
                <form onSubmit ={onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                        placeholder="Reply to post"
                        name={text}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        errors ={errors.text}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
    )
}

export default CommentForm