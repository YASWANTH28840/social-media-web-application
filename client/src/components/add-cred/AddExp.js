import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom' 
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFeildGroup from '../common/TextAreaFeildGroup'
import {addExp} from '../../actions/profileActions'

function AddExp(){

  const dispatch = useDispatch()

  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [current, setCurrent] = useState(false)
  const [description, setDescription] = useState('')
  const [disabled, setDisabled] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const exp = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    }
    dispatch(addExp(exp))
  }
  const errors = useSelector(state => state.errors)

  return(
      <div className="section add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <a href="dashboard.html" className="btn btn-light">
              Go Back
            </a>
            <h1 className="display-4 text-center">Add Your Experience</h1>
            <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
            <small className="d-block pb-3">* = required field</small>
            <form action="add-experience" onSubmit={onSubmit}>  
              <TextFieldGroup
                placeholder='Job Title'
                name='title'
                value={title}
                errors={errors.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextFieldGroup
                type='text'
                placeholder='Company'
                name='company'
                value={company}
                errors={errors.company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <TextFieldGroup
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                errors={errors.location}
                onChange={(e) => setLocation(e.target.value)}
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
              <div className="form-check mb-4">
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
                <label className="form-check-label" htmlFor="current" >
                  Current Job
                </label>
              </div>
              <TextAreaFeildGroup
                placeholder="Job Description"
                name="description"
                value={description}
                errors={errors.description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <small className="form-text text-muted">Some of your responsabilities, etc</small>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddExp