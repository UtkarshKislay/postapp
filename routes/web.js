const express = require("express");
const router = express.Router();
const Post = require("../models/post");
var moment = require("moment");
const { ensureAuth } = require("../midlware/auth");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const result = await Post.find({});
    if (req.user) {
      res.locals.user = req.user;
      res.render("index", {
        data: result,
        moment: moment,
        userExist: 1,
      });
    } else {
      res.render("index", {
        data: result,
        moment: moment,
        userExist: 0,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/post/create/new", ensureAuth, async (req, res) => {
  try {
    res.render("createPost.ejs", { data: 0 });
  } catch (err) {
    console.log(err);
  }
});

router.post("/post/create/new", ensureAuth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await Post.create({
      title: title,
      description: description,
      creatorImg: req.user.image,
      createdBy: req.user.googleId,
      displayName: req.user.displayName,
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/post/update/:id", ensureAuth, async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    // console.log(result);
    res.render("updatePost.ejs", { data: result });
  } catch (err) {
    console.log(err);
  }
});
router.post("/post/update/:id", ensureAuth, async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.params.id, req.body);
    // console.log(result);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});
router.post("/post/delete/:id", ensureAuth, async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
