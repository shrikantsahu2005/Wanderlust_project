const express = require("express");
const router = express.Router();
const wrapasync = require("../utlis/wrapasync");
const multer = require("multer");
const { storage } = require("../configure.js");
const upload = multer({ storage });
const review = require("../models/review");
const listing = require("../models/listing");
const flash = require("connect-flash");
const passport = require("passport");
const { isLoggedIn, isOwner, validatedlisting } = require("../middleware");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const listingcontroller = require("../controller/listings.js");



router.get("/new", isLoggedIn, listingcontroller.newlsiting);

router
  .route("/")
  .get(wrapasync(listingcontroller.index))
  .post(
    isLoggedIn,
    upload.single("list[url]"),
    wrapasync(listingcontroller.getlisting)
  );

router
  .route("/:id")
  .get(wrapasync(listingcontroller.showlsitings))
  .put(
    isLoggedIn,
    isOwner,
    isLoggedIn,
    upload.single("list[url]"),
    wrapasync(listingcontroller.putedit)
  );

router.get("/:id", wrapasync(listingcontroller.showlsitings));
router.delete("/:id/", wrapasync(listingcontroller.deletelistings));
router.get("/:id/edit", isOwner, wrapasync(listingcontroller.getedit));

module.exports = router;
