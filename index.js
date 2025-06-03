if (process.env.NODE_ENV!="production" ) {
    require("dotenv").config();
}

console.log(process.env.CLOUD_API_SECRET)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utlis/wrapasync");
const ExpressError = require("./utlis/expressError");
const { listingschema, Reviewschem } = require("./schema");
const review = require("./models/review");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");



const listingrouter = require("./routes/listings.js");
const reviewrouter = require("./routes/reviews.js");
const usersrouter = require("./routes/user.js");
const { error } = require("console");

// Set up EJS and middleware

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const dburl=process.env.db_url



const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret: process.env.SECRET
    },
    touch:24*3600

})
store.on("error",()=>{
    console.log("error in session",err)

})
    


// Session & Flash setup
const sessionoption = {
      store:store,
      secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true
    }
};
app.use(session(sessionoption));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Flash middleware (make available to views)
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});
//currentuser
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user || null;
//   next();
// });
// Routes
app.use("/listing", listingrouter);
app.use("/listing/:id/review", reviewrouter);
app.use("/", usersrouter);

// Home route
app.get("/", (req, res) => {
    res.send("This is the home route of Wanderlust server");
});

// Error handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});


app.use((err, req, res, next) => {
    const { statusCode = 520 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render("listings/error.ejs", { err });
});

// MongoDB connection


async function main() {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB");
}
main().catch(err => console.log(err));

// Server start
const port = 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});