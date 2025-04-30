const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utlis/wrapasync");
const ExpressError = require("../utlis/expressError");

const { listingschema, Reviewschem } = require("../schema");
const Review = require("../models/review");
const Listing = require("../models/listing");
 const {validateReview, isLoggedIn, isreviewauthor} =require("../middleware");
const review = require("../models/review");


const reviewlisting=require("../controller/review.js")






router.post("/",isLoggedIn,wrapAsync(reviewlisting.createreviwes));



router.delete("/:reviewid", isLoggedIn,isreviewauthor,wrapAsync(reviewlisting.deletereview));

module.exports = router;