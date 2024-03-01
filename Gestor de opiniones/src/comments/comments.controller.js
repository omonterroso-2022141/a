'use stric'
import Comment from './comments.model.js'
import Post from '../publishing/post.model.js'

export const addComments = async(req, res)=>{
    try{
        let { uid } = req.user
        let { id } = req.params
        let data = req.body
        let post = await Post.findOne({_id:id})
        if(!post) return res.status(404).send({message: 'Post not found'})
        data.user = uid
        data.post = id
        let comment = new Comment(data)
        try{
            await comment.save()
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'Error saving comment'}) 
        }
        return res.send({message: 'You made a comment!'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System Error'}) 
    }
}

export const editComments = async(req, res)=>{
    try{
        let { uid } = req.user
        let { id } = req.params
        let data = req.body
        let comment = await Comment.findOne({_id:id})
        if(!comment) return res.status(404).send({message: 'The comment was not found'})
        if(comment.user != uid) return res.status(401).send({message: 'You cannot edit a comment that is not yours'})
        if(data.user || data.publication) return res.status(401).send({message: 'You cannot edit the data'})
        let commentUpdate = await Comment.findOneAndUpdate(
        {_id: id},
        data,
        {new: true})
        if(!commentUpdate) return res.status(404).send({message: 'Error editing comment'})
        return res.send({message: 'Comment edit successfully', commentUpdate})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System Error'}) 
    }
}

export const deleteComments = async(req, res)=>{
    try{
        let { id } = req.params
        let { uid } = req.user
        let comment = await Comment.findOne({_id:id})
        if(!comment) return res.status(404).send({message: 'The comment was not found'})
        if(comment.user !=uid) return res.status(401).send({message: 'You cannot delete a comment that is not yours'})
        let commentDelete = await Comment.findOneAndDelete({_id:id})
        if(!commentDelete) return res.status(404).send({message: 'Error delete comment'})
        return res.send({message: `The comment delete successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System Error'}) 
    }
}