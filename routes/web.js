const express=require('express');
const router=express.Router();
const Post=require('../models/post');
var moment = require('moment');
const {ensureAuth} =require('../midlware/auth');

router.get('/',async(req,res)=>{
    try{
        const is=(req.user)?1:0;
        const result=await Post.find();
        if(req.user){
            res.render('index',{data:result,moment:moment,isUser:is,userImg:req.user.image});
        }else{
            res.render('index',{data:result,moment:moment,isUser:is,userImg:''});
        }
    }catch(err){
        console.log(err);
    }
})
router.get('/post/create/new',ensureAuth,async(req,res)=>{
    try{
        res.render('createPost.ejs');
    }catch(err){
        console.log(err);
    }
});
router.post('/post/create/new',ensureAuth,async(req,res)=>{
    try{
        // console.log("post", req.body);
        const {title,description}=req.body;
        const result=await Post.create({
            title:title,
            description:description
        })
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
});

// router.get('*',async(req,res)=>{
//    res.redirect('/');
// });




module.exports=router;