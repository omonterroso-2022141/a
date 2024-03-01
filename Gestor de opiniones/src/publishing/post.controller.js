'use stric'

import Post from './post.model.js'
import Category from '../category/category.model.js'

export const addPost = async(req, res)=>{
    try{
        let { uid } = req.user
        let data = req.body
        if(!data) 
            return res.status().send({message: 'Post could not be published'})
        let category = await Category.findOne({_id:data.category})
        if(!category)
            return res.status(404).send({message: 'Category not found'})
        data.user = uid
        let post = new Post(data)
        try{
            await post.save()
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'Error publishing'}) 
        }
        return res.send({message: 'Saved post'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System error'}) 
    }
}

export const myPosts = async(req, res)=>{
    try{
        let { uid } = req.user
        let post = await Post.find({user:uid})
        return res.send({message: 'Post: ', post})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System Error'}) 
    }
}

export const updateMyPost = async(req, res)=>{
    try{
        let { id } = req.params
        let post = await Post.findOne({_id:id})
        if(!post) return res.status(404).send({message: 'Post could not be found'})
        
        let { uid } = req.user
        if(post.user!=uid) return res.status(404).send({message: 'You cannot modify a post that is not yours'})
        
        let data = req.body
        let updatePost = await Post.findOneAndUpdate(
            {_id:id}, data,{new: true})
        if(!updatePost) return res.status(404).send({message: 'Could not update post'})
        return res.send({message: 'Your post has been updated!', updatePost})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System Error'}) 
    }
}

export const deleteMyPost = async(req, res)=>{
    try{
        let { uid } = req.user
        let { id } = req.params
        let post = await Post.findOne({_id:id})
        if(!post) return res.status(404).send({message: 'The post was not found or does not exist'})
        if(post.user!=uid) return res.status(404).send({message: 'You cannot post a post that is not yours'})
        let deleteMyPost = await Post.findOneAndDelete({_id:id})
        if(!deleteMyPost) return res.status(404).send({message: 'Could not delete post'})
        return res.send({message: ` ${deleteMyPost.title}| Your post has been delete!`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System Error'}) 
    }
}