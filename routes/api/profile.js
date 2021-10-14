const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const Profile = require('../../models/Profile')
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')
const User = require('../../models/User')

const router = express.Router()

router.get('/',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const err = {};
        Profile.findOne({ user:req.user.id })
            .populate('user',['name','avatar'])
            .then(profile => {  
                if(!profile){
                    err.noProfile = 'There is no profile for user'
                    return res.status(404).json(err)
                }
                res.json(profile)
            })
            .catch(err=> res.status(404).json(err))
    }
);
 
router.post('/',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const {err,isValid} = validateProfileInput(req.body)
        if(!isValid){
            return res.status(400).json(err)
        }
        const profileField = {};
        profileField.user = req.user.id;
        if(req.body.handle) profileField.handle = req.body.handle;
        if(req.body.cv) profileField.cv = req.body.cv;
        if(req.body.company) profileField.company = req.body.company;
        if(req.body.website) profileField.website = req.body.website;
        if(req.body.location) profileField.location = req.body.location;
        if(req.body.status) profileField.status = req.body.status;
        if(typeof req.body.skills !== 'undefined'){
            profileField.skills = req.body.skills.split(',')
        } 
        if(req.body.bio) profileField.bio = req.body.bio;
        if(req.body.github) profileField.github = req.body.github;
        profileField.social = {};
        if(req.body.youtube) profileField.social.youtube = req.body.youtube
        if(req.body.twitter) profileField.social.twitter = req.body.twitter
        if(req.body.facebook) profileField.social.facebook = req.body.facebook
        if(req.body.linkdin) profileField.social.linkdin = req.body.linkdin
        if(req.body.instagram) profileField.social.instagram = req.body.instagram

        Profile.findOne({user:req.user.id})
        .then((profile)=>{
            if(profile){
                Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileField},
                    {new:true},
                )
                .then(profile => res.json(profile))
            }else{
                Profile.findOne({handle:profileField.handle})
                .then(profile =>{
                    if(profile){
                        err.handle='Handle exist'
                        return res.status(400).json(err)
                    }
                    new Profile(profileField).save()
                    .then(profile => res.json(profile))
                })
            }
        })
    }
);

router.get('/handle/:handle',(req,res)=>{
    const err = {};


    Profile.findOne({handle:req.params.handle})
    .populate('user',['name','avatar'])
    .then((profile)=>{
        if(!profile){
            err.noProfile = 'No profile exist'
            return res.status(404).json(err)
        }
        res.json(profile)
    })
    .catch(err => res.status(400).json(err))
})

router.get('/user/:user_id',(req,res)=>{
    const err = {}
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar'])
    .then((profile)=>{
        if(!profile){
            err.noProfile = 'No profile exist'
            return res.status(404).json(err)
        }
        res.json(profile)
    })
    .catch(err=>{return res.status(404).json({msg:'No profile exist'})})
})

router.get('/all',(req,res)=>{
    Profile.find()
    .populate('user',['name','avatar'])
    .then((profile)=>{
        if(!profile){
            res.status(404).json({mas:'No profile exist'})
        }
        res.json(profile)
    })
    .catch(err=>{return res.status(400).json(err)})
})

router.post('/experience',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    const {errors,isValid} = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newExp = {
            title:req.body.title,
            company:req.body.company,
            location:req.body.location,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        profile.experience.unshift(newExp)
        profile.save()
        .then(profile => res.json(profile))

    })
})

router.post('/education',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    const {errors,isValid} = validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newEdu = {
            school:req.body.school,
            degree:req.body.degree,
            fieldofstudy:req.body.fieldofstudy,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        profile.education.unshift(newEdu)
        profile.save()
        .then(profile => res.json(profile))

    })
})

router.delete('/experience/:exp_id',
passport.authenticate('jwt',{ session:false }),
(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const removeIndex=profile.experience
        .map(item=>item._id)
        .indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1)
        profile.save()
        .then(profile=>res.json(profile))
    })
    .catch(err=> res.status(404).json(err))
})

router.delete('/education/:edu_id',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const removeIndex = profile.education
        .map(item=>item._id)
        .indexOf(req.params.edu_id)
        profile.education.splice(removeIndex,1)
        profile.save()
        .then(profile => res.json(profile))
    })
    .catch(err => res.status(400).json(err))
})
router.delete('/',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    await Profile.findOneAndRemove({user: req.user.id})
    await User.findByIdAndRemove(req.user.id)
    console.log('deleted')
});




module.exports = router;