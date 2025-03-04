import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    email: String,
    title: String,
    batch: String,
    creator: String,
    content: String,
    department: String,
    creatorToken: String,
    selectedFile: String,
    feedback: {
        type: String,
        default: ''
    },
    priority: {
        type: Number,
        default: 0
    },
    state: {
        type: String,
        default: 'Pending'
    },
    createAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;