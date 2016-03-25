"use strict";
module.exports = function (app, model_review) {

    //Declaration
    app.get("/api/project/getReviews:restId", findAllReviewsForRest);
    app.get("/api/project/defaultReview", loadDefaultRating);


    //Implementation
    function findAllReviewsForRest(req, res){
        var restId = req.params.restId;
        var reviews = model_review.findAllReviewsForRest(restId);
        res.send(reviews);
    }

    function loadDefaultRating(req, res){
        var review = model_review.loadDefaultRating();
        res.send(review);
    }
    
};