import React from 'react'
import { useSelector } from 'react-redux'
import {isEmpty} from '../../validation/isEmpty'
import {Link} from 'react-router-dom'

const ProfileItem = (props) => {
    return(
        props.profiles.map((profile) => {
            const {user: {avatar, name}} = profile
            console.log(profile)
            
            return(
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <img src={avatar} alt="" />
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h1>{name}</h1>
                            <p>
                                {profile.status} {isEmpty(profile.company)? null : <p>at {profile.company}</p>}
                            </p>
                            <p>
                                {isEmpty(profile.location)
                                ?
                                null : profile.location
                                }
                            </p>
                            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                                View Profile
                            </Link>
                        </div>
                        <div className="col-md-4 d-none d-md-block">
                            <h4>Skills</h4>  
                            <ul>
                            {profile.skills.slice(0,4).map((skill) => {
                                return(
                                    <li>{skill}</li>
                                )
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default ProfileItem