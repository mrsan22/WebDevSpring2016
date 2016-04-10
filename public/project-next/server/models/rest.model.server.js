"use strict";
module.exports = function (db, mongoose) {
    //load rest schema
    var RestSchema = require("./restaurant.schema.server.js")(mongoose);

    //create low level mongoose restaurant model
    var RestModel = mongoose.model('EatnReview.restaurant', RestSchema);

    var api = {
        addRest : addRest,
        findRestById : findRestById
    };

    return api;

    function addRest(rest){
        var restObj = {
            "name":rest.name,
            "imageUrl": rest.image_url
        };

        return RestModel.findOneAndUpdate({'_id':rest.id},restObj,{upsert:true});
    }

    function findRestById(restId){
        return RestModel.findById(restId);
    }

};