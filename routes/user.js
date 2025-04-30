const express=require("express")
const router=express.Router({mergeParams:true});
const User=require("../models/user");
const wrapasync = require("../utlis/wrapasync");
const passport = require("passport");
const {saveRedirect}=require("../middleware.js");



const userlisting=require("../controller/user.js")


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup",wrapasync(userlisting.signup))

// login get route
router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
})

// login post route

router.post(
    "/login",
    saveRedirect,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userlisting.login
  );
// router.post("/login", passport.authenticate('local',{failureRedirect:'/login',failureFlash:true})
// ,async(req,res)=>{
    
//    req.flash("success", "Welcome back to Wanderlust")
//    res.redirect("/listing")
    
    
// }
// )
router.get("/logout",userlisting.logout)
module.exports=router