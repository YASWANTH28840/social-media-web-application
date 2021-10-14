import React from 'react'
import {isEmpty} from '../../validation/isEmpty'

const ProfileHeader = (props) =>{
    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={props.profile.user.avatar} />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{props.profile.user.name}</h1>
              <p className="lead text-center">{props.profile.status}</p>
              <p><i class="fas fa-globe-americas"></i> {props.profile.location}</p>
              <p>
              {isEmpty(props.profile.website)?null:(
                <a className="text-white p-2" href={props.profile.website}>
                  <i className="fas fa-globe"> Website</i>
                </a>
              )}

              {isEmpty(props.profile.social && props.profile.social.twitter)?null:(
                <a className="text-white p-2" href={props.profile.social.twitter}>
                  <i className="fab fa-twitter"> Twitter</i>
                </a>
              )}
              {isEmpty(props.profile.social && props.profile.social.facebook)?null:(
                <a className="text-white p-2" href={props.profile.social.facebook}>
                  <i className="fab fa-facebook-f"> FB</i>
                </a>
              )}
              {isEmpty(props.profile.social && props.profile.social.linkdin)?null:(
                <a className="text-white p-2" href={props.profile.social.linkdin}>
                  <i className="fab fa-linkedin-in"> In</i>
                </a>
              )}
              {isEmpty(props.profile.social && props.profile.social.instagram)?null:(
                <a className="text-white p-2" href={props.profile.social.instagram}>
                  <i className="fas fa-globe fa-2x">in</i>
                </a>
              )}
              {isEmpty(props.profile.social && props.profile.social.youtube)?null:(
                <a className="text-white p-2" href={props.profile.social.youtube}>
                  <i className="fas fa-globe fa-2x">yt</i>
                </a>
              )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProfileHeader