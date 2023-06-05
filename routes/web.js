const express=require('express');
const router=express.Router();
const Post=require('../models/post');
var moment = require('moment');


router.get('/',async(req,res)=>{
    try{
        const result=await Post.find();
        // console.log(result);
        res.render('index',{data:result,moment:moment});
    }catch(err){
        console.log(err);
    }
})
router.get('/post/create/new',async(req,res)=>{
    try{;
        // console.log("get", req.body);
        res.render('createPost.ejs');
    }catch(err){
        console.log(err);
    }
});
router.post('/post/create/new',async(req,res)=>{
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

router.get('*',async(req,res)=>{
   res.redirect('/');
});




module.exports=router;