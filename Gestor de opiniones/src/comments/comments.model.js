import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    commentary: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'post',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default mongoose.model('comments', commentSchema)