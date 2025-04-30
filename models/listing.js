const mongoose=require("mongoose");
const review = require("./review");

const listingschema=new mongoose.Schema({

    title:{
       type: String,
       required:true,
    },
    
    description:String,
    image: {
        filename:String,
        url:{
        type:String, 
        }
},

    price:Number,
    location:String,
    country:String,
    reviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"review",

     }

     ],
     owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     },
     geometrys: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }


})

listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id: { $in:listing.reviews}})
    }
})



const listing=mongoose.model("listing",listingschema)

module.exports=listing;
