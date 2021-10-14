const validator = require('validator')
const isEmpty = require("./is-empty")
module.exports = function validateProfileInput(data){
    let err = {};
 
    data.handle = !isEmpty(data.handle) ? data.handle : ''
    data.status = !isEmpty(data.status) ? data.status : ''
    data.skills = !isEmpty(data.skills) ? data.skills : ''
 

    if(!validator.isLength(data.handle,{min:2,max:40})){
        err.handle = 'Handle needs to be between 2 and 40 char'
    }
 
    if(validator.isEmpty(data.handle)){
        err.handle = 'handle is required'
    }
    if(validator.isEmpty(data.status)){
        err.status = 'status is invalid'
    }
    if(validator.isEmpty(data.skills)){
        err.skills = 'skills is invalid'
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            err.website = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            err.youtube = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            err.twitter = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            err.facebook = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.linkdin)){
        if(!validator.isURL(data.linkdin)){
            err.linkdin = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            err.instagram = 'Not a valid URL'
        }
    }


    return {
        err,
        isValid: isEmpty(err)
    }
}