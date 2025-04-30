
const authenticate=require("passport")
const listing=require("./models/listing")
const ExpressError=require("./utlis/expressError")
const{listingschema,Reviewschem}=require("./schema");
const review = require("./models/review");





module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalURL;
        req.flash("error", "You must be logged in.");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirect = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirect = req.session.redirectURL;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listings = await listing.findById(id).populate('owner'); // Added await and populate
    
    if (!listings.owner.equals(res.locals.currentUser)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listing/${id}`); // Added return and specific redirect
    }
    next()

}

 module.exports.validatedlisting=(req,res,next)=>{
    
  let{error} = listingschema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
     }else{
        next();
     }     
}


module.exports.validateReview = (req, res, next) => {
    const { error } = Reviewschem.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
};

module.exports.isreviewauthor=async(req,res,next)=>{
    let { id ,reviewid } = req.params;
    let reviews = await review.findById(reviewid) // Added await and populate
    
    if (!reviews.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the author  of this review");
        return res.redirect(`/listing/${id}`); // Added return and specific redirect
    }
   
    next()

}