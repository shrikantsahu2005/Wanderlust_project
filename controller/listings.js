const listing=require("../models/listing")
const { isLoggedIn, isOwner, validatedlisting } = require("../middleware"); 
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index callback
module.exports.index=async(req,res)=>{
    let allistings=await listing.find({})
     res.render("./listings/index.ejs",{allistings})
 }

 // new get route
 module.exports.newlsiting=async(req,res)=>{
   
    res.render("listings/new.ejs")
}

//new post routh
module.exports.getlisting= async (req,res,next)=>{

    let response= await geocodingClient.forwardGeocode({
        query: req.body.list.location,
        limit: 1
      })
        .send()

let url=req.file.path
let filename=req.file.filename
 

let newlisting=  new listing( req.body.list);
    
newlisting.owner=req.user._id;
       newlisting.image={url,filename}
       newlisting.geometrys=response.body.features[0].geometry

    let savelisting= await newlisting.save()
    // .then((res)=>{
        
    //   console.log("this data has been store in database")
    //   })
  
       req.flash("success","new route has been created!")
       console.log(savelisting)
     res.redirect("/listing")
  
     next(new ExpressError(401,"this is te"))
     
 }

 // get edit route

 module.exports.getedit= async(req,res)=>{

    let{id}=req.params;
    
    const Listing = await listing.findById(id)
    if(!Listing){
        req.flash("error","Listing you requested dosen't Exit")
        res.redirect("/listing")
    }
   let orignalimg= Listing.image.url;
   orignalimg=orignalimg.replace("/upload","/upload/h_150,w_250")
           res.render("listings/edit.ejs",{Listing ,orignalimg})

}

//put edit route
 module.exports.putedit =async (req, res, next) => {
    let { id } = req.params;
   
if (!listing) { // Moved this check up
        req.flash("error", "Listing you requested doesn't Exist");
        return res.redirect("/listing"); // Added return to prevent further execution
    }
   let list= await listing.findByIdAndUpdate(id, { ...req.body.list });

   if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url)
    console.log(filename)
     list.image ={url,filename}
 await list.save();
req.flash("success","this image has been updated")
   }
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
}

// show route
module.exports.showlsitings= async (req,res)=>{
    let {id}=req.params
let Listing = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
console.log("Owner data:", Listing.owner);

console.log(Listing)
      res.render("listings/show.ejs",{Listing})
       
 
   }

   //delete route

  module.exports.deletelistings =async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id)
    req.flash("success"," route has been deleted")
    res.redirect("/listing")



}