const Review = require("../models/review");
const Listing = require("../models/listing");


//create review route

module.exports.createreviwes= async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
 
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
 
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; 
   
    listing.reviews.push(newReview);
 
    await newReview.save();
    await listing.save();
 
    req.flash("success", "Review has been added!");
    res.redirect(`/listing/${id}`);
 };
 

 //delete review route

   module.exports.deletereview=async (req, res) => {
    let { id, reviewid } = req.params;
  
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);

    req.flash("success", "Review has been deleted!");
    res.redirect(`/listing/${id}`);
}
 
 