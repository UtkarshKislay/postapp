const mongoose=require('mongoose');

// const PostSchema=async()=>{
    const postSchema= new mongoose.Schema({
        title:{
            type:String,
            required:true
        } ,
        description:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    });
    const Post=mongoose.model('post',postSchema);
    // export default post;
    module.exports=Post;

// }
