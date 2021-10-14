import React from 'react'
import axios from 'axios'

const Experience = (props) => {
    const handleClick = (id) => {
        axios.delete(`/api/profile/education/${id}`)
        .then(window.location='/dashboard')
    }
    const education = props.education.map(edu => {
        return(
            <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td>{edu.from} - {edu.to}</td>
            <td>
                <button className='btn btn-danger' onClick={() => {
                    handleClick(edu._id)
                }} >Delete</button>
            </td>
        </tr>
        )
    })
    return(
        <div>
            <h4 className="mb-4">Education</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Field</th>
                        <th>Year</th>
                        <th></th>
                    </tr>
                    {education}
                </thead>
            </table>
        </div>
    )
}

// const eduerience = (props) => {
//     const content = props.eduerience.map((edu) => {
//         return(
//             <p>{edu._id}</p>
//         )
//     })
//     return(
//         <div>
//             {content}
//         </div>
//     )
// }

export default Experience