const express = require('express')
const Post = require('../../models/Post')
const mongoose = require('mongoose')
const passport = require('passport')
const validatePostInput = require('../../validation/post')
const Profile = require('../../models/Profile')
const validateCommentInput = require('../../validation/comment')

const router = express.Router()

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validatePostInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    const newPost = new Post({
        text:req.body.text,
        mediaLink:req.body.mediaLink,
        mediaType:req.body.mediaType,
        name:req.body.name, 
        avatar:req.body.avatar,
        user:req.user.id
    });
    newPost.save()
    .then(post=>res.json(post))
});

router.get('/',(req,res)=>{
    Post.find()
    .sort({date: -1})
    .then(posts=>{
        res.json(posts)
    })
    .catch(err => {return res.status(404).json({msg:'no post found'})})
})

router.get('/:post_id',(req,res)=>{
    Post.findById(req.params.post_id)
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{return res.status(404).json({msg:'Post not found'})})
})

 router.delete('/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.post_id)
        .then(post=>{
            if(post.user.toString() === req.user.id){
                Post.findByIdAndRemove(req.params.post_id)
                .then(()=>res.json({msg:'Post deleted'}))
            }else{
                return res.status(401).json({msg:'unauthorized user'})
            }
        })
        .catch(err=>{return res.status(404).json({msg:'not found'})})
    })
 })

 router.post('/like/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.post_id)
        .then(post=>{
            if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                return res.status(400).json({msg:'already liked'})
            }
            post.likes.push({user:req.user.id})
            post.save()
            .then(post=>res.json(post))
        })
        .catch(err=>{return res.status(404).json({msg:'not found'})})
    })
 })


 router.post('/unlike/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.post_id)
        .then(post=>{
            if(
            post.likes.filter(like=>like.user.toString()===req.user.id).length === 0){
                return res.status(400).json({msg:'u havent liked'})
            }
            const removeIndex = post.likes
                .map(item=>item.user.toString())
                .indexOf(req.user.id)
                post.likes.splice(removeIndex,1)
            post.save()
            .then(post=>res.json(post))
        })
        .catch(err=>{return res.status(404).json({msg:'not found'})})
    })
 })

 router.post('/comment/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{errors,isValid} = validateCommentInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    Post.findById(req.params.post_id)
    .then(post=>{
        post.comment.push({
            user:req.user.id,
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar
        })
        post.save()
        .then(post=>res.json(post))
    })
    .catch(err=>{return res.status(404).json({msg:'not found'})})
 })

 router.delete('/comment/:post_id/:comm_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
   Post.findById(req.params.post_id)
   .then(post=>{
    if(
        post.comment.filter(comment=>comment._id.toString()===req.params.comm_id).length === 0){
            return res.status(400).json({msg:'u havent commented'})
        }
        const removeIndex = post.comment
            .map(item=>item._id.toString())
            .indexOf(req.params.comm_id)
            post.comment.splice(removeIndex,1)
        post.save()
        .then(post=>res.json(post))
   })
 })

module.exports = router;