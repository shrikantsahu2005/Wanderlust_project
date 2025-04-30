const { number, date, string, ref } = require("joi")
const mongoose=require("mongoose")
const { create } = require("./listing")
const { type } = require("../schema")

const reviewschema=new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createact:{
        type:Date,
        default:Date.now()
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }


})

const review=mongoose.model("review",reviewschema)

module.exports=review;