

const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")

const user=new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
})

user.plugin(passportLocalMongoose);


module.exports=mongoose.model("user",user)