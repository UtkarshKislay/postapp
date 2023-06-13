const express = require("express");
const { ensureAuth } = require("../midlware/auth");
const router = express.Router();

router.get('/profile',ensureAuth,async(req,res)=>{
    try {
        if (req.user) {
          res.locals.user = req.user;
          res.render("profile", {
            userExist: 1,
          });
        } else {
          res.render("profile", {
            userExist: 0,
          });
        }
      } catch (err) {
        console.log(err);
      }
});

module.exports =router;