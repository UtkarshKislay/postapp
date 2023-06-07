
const ensureAuth=(req,res,next)=>{
   
    if(req.isAuthenticated() ){
      res.locals.user=req.user;
     return next();
    }
    res.redirect("/auth/google");
 }
 
 
//  const ensureGuest=(req,res,next)=>{
//      if(req.isAuthenticated()){
//          return res.redirect('/');
//      }
//      next();
//  }
 
module.exports={ensureAuth};