import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creator: String,
    creatorToken: String,
    email: String,
    title: String,
    content: String,
    tags: [String],
    selectedFile: String,
    address: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    state: {
        type: String,
        default: 'Pending'
    },
    priority: {
        type: Number,
        default: 0
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;