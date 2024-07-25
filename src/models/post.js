import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    prefix: { type: String, required: true },
    title: { type: String, required: true, trim: true, maxLength: 50 },
    writer: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    content: { type: String, required: true, trim: true },
    meta: {
        views: { type: Number, default: 0, required: true },
        like: { type: Number, default: 0, required: true },
        comments: {type: Number, default: 0, required: true },
    },
});

postSchema.pre('save', async function(){
    console.log(this);

})


const Post = mongoose.model("Post", postSchema);
export default Post;

