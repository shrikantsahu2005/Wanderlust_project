const User=require("../models/user");



//post request of signup
 module.exports.signup= async(req,res)=>{
    try {
        let {username,email,password}=req.body;
        let newUser=new User({email,username});
         let registeruser= await User.register(newUser,password)
        console.log(registeruser)
        req.login(registeruser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","welcome to Wanderlust")
            res.redirect("/listing")
            
        })
       
        } catch (e){
        req.flash("error",e.message)
        res.redirect("/signup")

        
    }
}
//post request of login
module.exports.login=async (req, res) => {
    console.log("HI");
    req.flash("success", "Welcome back to Wanderlust");
    let redirecturl=res.locals.redirect ||"/listing"
          res.redirect(redirecturl)
    
  }
  //post request of logout

  module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","logged you out")
        res.redirect("/listing")
    });
    
}