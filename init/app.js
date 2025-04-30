const mongoose=require("mongoose")
const initdata=require("./data")
const listing=require("../models/listing")

main()
.then(()=>{
    console.log("this is connect with databases")
   
}).catch((err)=>{
 console.log(err)
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust')
    
}

const initdb= async () => {
    await listing.deleteMany()
    initdata.data = initdata.data.map((obj)=>({
        ...obj,
        owner:"680619938722b81fd787c9f2"
    }))
    await listing.insertMany(initdata.data)
    console.log("this data has been store in database")
    console.log("the databases is re inialized")

    
}

initdb();