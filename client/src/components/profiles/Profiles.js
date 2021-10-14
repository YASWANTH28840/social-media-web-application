import axios from 'axios';
import { json } from 'body-parser';
import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProfiles} from '../../actions/profileActions'
import spinner from '../common/spinner';
import ProfileItem from './ProfileItem'

const Profiles = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfiles())
    },[])
    const {profiles, loading} = useSelector(state => state.profile)


    let profileItems
    if(profiles === null || loading){
        profileItems = <spinner/>
    }else{
        if(profiles.length>0){
            profileItems = <ProfileItem profiles={profiles} />
        }else{
            profileItems = <h4>No profiles found</h4>
        }
    }

    return(
        <div className="profiles">
            <div className="cintainer">
                <div className="row">
                    <div className="col-md-12">
                        <div className="display-4 text-center">
                            <h1>Developer Profile</h1>
                            <p className="lead text-center">
                                Connect with developers
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles