const joi=require("joi")


module.exports= listingschema=joi.object({
    list:joi.object({
       title:joi.string().required(),
        description:joi.string().required(),
        url:joi.string().allow("",null),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required()


        

    }).required()

})

module.exports= Reviewschema=joi.object({
    review:joi.object({
        comment:joi.string().required(),
        rating:joi.number().required()

    }).required()
})




