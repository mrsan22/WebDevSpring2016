"use strict";
module.exports = function (app, model_review) {

    //Declaration
    app.get("/api/project/getReviews:restId", findAllReviewsForRest);
    app.post("/api/project/user/:userId/rest/:restId", addReview);


    //Implementation
    function findAllReviewsForRest(req, res){
        var restId = req.params.restId;
        var reviews = model_review.findAllReviewsForRest(restId);
        res.json(reviews);
    }

    function addReview(req, res){
        var userId = req.params.userId;
        var restId = req.params.restId;
        var review = req.body;
        model_review.addReview(userId, restId, review);
        var reviews = model_review.findAllReviewsForRest(restId);
        res.json(reviews);
    }
    
};