import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFeildGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createProfile} from '../../actions/profileActions'
import TextWithIcon from '../common/TextWithIcon'
import storage from '../../firebase'

const CreateProfile = () => {
    const dispatch = useDispatch()
    const {isAuthenticated, user} = useSelector(state => state.auth)

 
    const [handle,setHandle] = React.useState("")
    const [cv, setCv] = React.useState('')
    const [company,setCompany] = React.useState("")
    const [website,setWebsite] = React.useState("")
    const [location,setLocation] = React.useState("")
    const [status,setStatus] = React.useState("")
    const [skills,setSkills] = React.useState("")
    const [github,setgithub] = React.useState("")
    const [bio,setBio] = React.useState("")
    const [twitter,setTwitter] = React.useState("")
    const [facebook,setFacebook] = React.useState("")
    const [linkdin,setLinkedin] = React.useState("")
    const [youtube,setYoutube] = React.useState("")
    const [instagram,setInstagram] = React.useState("")
    const [file, setFile] = React.useState(null)

    let errors = useSelector(store => store.errors)

    const onSubmit = async(e) => {
        e.preventDefault()
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()
        const newprofile = {
            handle: handle,
            cv:fileUrl,
            status:status,
            company:company,
            website:website,
            location:location,
            skills:skills,
            github,
            bio:bio,
            twitter:twitter,
            facebook:facebook,
            linkdin:linkdin,
            youtube:youtube,
            instagram:instagram
        }
        console.log(newprofile)
        dispatch(createProfile(newprofile))
        
    }
    const onchange = (e) => {
      setFile(e.target.files[0])
    }

    const options = [
      {label: "* Select profession", value: 0},
      {label: "Developer", value: "Developer"},
      {label: "Junior Developer", value: "Junior Developer"},
      {label: "Senior Developer", value: "Senior Developer"},
      {label: "Manager", value: "Manager"},
      {label: "Student or Learning", value: "Student or Learning"},
      {label: "Instructor", value: "Instructor"},
      {label: "Intern", value: "Intern"},
      {label: "Other", value: "Other"}
    ]

    if(!isAuthenticated){
        return(<Redirect to="/login" />)
    }else{
    return(
        <div style={{margin: "100px"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required field</small>
              <form action="add-experience.html" onSubmit={onSubmit}>
                <TextFieldGroup
                  type = "text"
                  errors = {errors.handle}
                  placeholder = "Profile Handle"
                  name = "handle"
                  value = {handle}
                  onChange = {(e)=>{setHandle(e.target.value)}}
                />
                <SelectListGroup
                  errors = {errors.status}
                  placeholder = "Status"
                  name = "status"
                  value = {status}
                  options={options}
                  onChange = {(e)=>{setStatus(e.target.value)}}
                />
                <TextFieldGroup
                  type = "text"
                  errors = {errors.name}
                  placeholder = "Company"
                  name = "company"
                  value = {company}
                  onChange = {(e)=>{setCompany(e.target.value)}}
                />
                <TextFieldGroup
                  type = "text"
                  errors = {errors.name}
                  placeholder = "Website"
                  name = "website"
                  value = {website}
                  onChange = {(e)=>{setWebsite(e.target.value)}}
                />
                <TextFieldGroup
                  type = "text"
                  errors = {errors.name}
                  placeholder = "Location"
                  name = "location"
                  value = {location}
                  onChange = {(e)=>{setLocation(e.target.value)}}
                />
                <TextFieldGroup
                  type = "text"
                  errors = {errors.skills}
                  placeholder = "Skills"
                  name = "skills"
                  value = {skills}
                  onChange = {(e)=>{setSkills(e.target.value)}}
                />
                <TextFieldGroup
                  type = "text"
                  errors = {errors.name}
                  placeholder = "Github username"
                  name = "github"
                  value = {github}
                  onChange = {(e)=>{setgithub(e.target.value)}}
                />
                <small className="form-text text-muted">If you want your latest repos and a Github link, include your username</small>
                <TextAreaFieldGroup
                  errors = {errors.name}
                  placeholder = "A short bio of yourself"
                  name = "bio"
                  value = {bio}
                  onChange = {(e)=>{setBio(e.target.value)}}
                />
                <span className="text-muted">Optional</span>
                <TextWithIcon
                  icon=""
                  type="text"
                  errors={errors.twitter}
                  placeholder="Twitter"
                  name={twitter}
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <TextWithIcon
                  icon=""
                  type="text"
                  errors={errors.facebook}
                  placeholder="Facebook"
                  name={facebook}
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
                <TextWithIcon
                  icon=""
                  type="text"
                  errors={errors.linkdin}
                  placeholder="Linkedin"
                  name={linkdin}
                  value={linkdin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                <TextWithIcon
                  icon=""
                  type="text"
                  errors={errors.youtube}
                  placeholder="Youtube"
                  name={youtube}
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
                <TextWithIcon
                  icon=""
                  type="text"
                  errors={errors.instagram}
                  placeholder="Instagram"
                  name={instagram}
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <input 
                    type="submit" 
                    className="btn btn-info btn-block mt-4"
                     />
                <input type="file" onChange={onchange} required/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
}

export {CreateProfile}