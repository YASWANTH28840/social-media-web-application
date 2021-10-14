import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom' 
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFeildGroup from '../common/TextAreaFeildGroup'
import {addEdu} from '../../actions/profileActions'

function AddEdu(){

    const dispatch = useDispatch()

    const [school, setSchool] = useState('')
    const [degree, setDegree] = useState('')
    const [fieldofstudy, setFieldofstudy] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [current, setCurrent] = useState(false)
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        const edu = {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        }
        dispatch(addEdu(edu))
      }
      const errors = useSelector(state => state.errors)

    return(
            <div>
              <a href="dashboard.html">
                Go Back
              </a>
              <h1>Add Your Education</h1>
              <p>Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required field</small>
              <form action="add-education" onSubmit={onSubmit}>
                <TextFieldGroup
                placeholder='School'
                name='school'
                value={school}
                errors={errors.school}
                onChange={(e) => setSchool(e.target.value)}
              />
                <TextFieldGroup
                type='text'
                placeholder='Degree of Certificate'
                name='degree'
                value={degree}
                errors={errors.degree}
                onChange={(e) => setDegree(e.target.value)}
              />
                <TextFieldGroup
                type='text'
                placeholder='Field of Study'
                name='fieldofstudy'
                value={fieldofstudy}
                errors={errors.setFieldofstudy}
                onChange={(e) => setFieldofstudy(e.target.value)}
              />
                <h6>From Date</h6>
                <TextFieldGroup
                type='date'
                name='from'
                value={from}
                errors={errors.from}
                onChange={(e) => setFrom(e.target.value)}
              />
                <h6>To Date</h6>
                <TextFieldGroup
                type='date'
                name='to'
                value={to}
                errors={errors.to}
                disabled={disabled?'disabled':''}
                onChange={(e) => setTo(e.target.value)}
              />
                <div>
                <input
                  className="form-check-input" 
                  type="checkbox" name="current" 
                  value={current}
                  checked={current}
                  name="current"
                  id="current"
                  onChange={(e) => {
                    setDisabled(!disabled)
                    setCurrent(!current)
                  }} 
                  />
                <label htmlFor="current" >
                  Current Job
                </label>
              </div>
                <TextAreaFeildGroup
                placeholder="pROGRAM Description"
                name="description"
                value={description}
                errors={errors.description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <small>Some of your responsabilities, etc</small>
                <input type="submit"/>
              </form>
            </div>
    )
}

export default AddEdu