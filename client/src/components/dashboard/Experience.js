import React from 'react'
import axios from 'axios'
import './Exp.css'

const Experience = (props) => {

    const handleClick = (id) => {
        axios.delete(`/api/profile/experience/${id}`)
        .then(window.location='/dashboard')
    }

    const experience = props.experience.map(exp => {
        return(
            <div className="container">
                <div class="column">
                    <div class="card">
                        <h3>{exp.company}</h3>
                        <p>{exp.title}</p>
                        <p>{exp.from} - {exp.to}</p>
                        <button className='btn btn-danger' onClick={() => {
                        handleClick(exp._id)
                    }} >Delete</button>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <div>
            {experience}
        </div>
    )
}

export default Experience