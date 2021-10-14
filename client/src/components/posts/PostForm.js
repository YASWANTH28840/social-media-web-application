import React, { useState } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFeildGroup'
import {addPost} from '../../actions/postActions'
import {useSelector, useDispatch} from 'react-redux'
import {getPost} from '../../actions/postActions'
import storage from '../../firebase'


const PostForm = () => {

    const [text, setText] = useState('')
    const [file, setFile] = useState(null)

    let errors = useSelector(state => state.errors)
    const {user:{name,avatar}} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const onSubmit = async(e) => {
        e.preventDefault()
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()
        const getType = () => {
          let type
          if(file.type.includes('image')){
            type = "image"
          }
          else if(file.type.includes('pdf')){
            type = "pdf"
          }
          else if(file.type.includes('officedocument')){
            type = "word"
          }
          else if(file.type.includes('msword')){
            type = "word"
          }
          else if(file.type.includes('video')){
            type = 'video'
          }
          else if(file.type.includes('audio')){
            type = 'audio'
          }
          return type
        }
        const newpost = {
            text,
            name,
            avatar,
            mediaLink: fileUrl,
            mediaType: getType()
        }
        dispatch(addPost(newpost))
        dispatch(getPost())
        setText('')
        errors.text = null
    }
    const onChange = (e) => {
      setFile(e.target.files[0])
    }
    return (
        <div style={{margin: "100px"}}>
            <div>
              <div>
                Say Somthing...
              </div>
              <div>
                <form onSubmit ={onSubmit}>
                  <div>
                  <input type="file" onChange={onChange} />
                    <TextAreaFieldGroup
                        placeholder="Create a post"
                        name={text}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        errors ={errors.text}
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
    )
}

export default PostForm