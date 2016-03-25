"use strict";
module.exports = function (app, model_review) {

    //Declaration
    app.get("/api/project/getReviews:restId", findAllReviewsForRest);
    app.post("/api/project/user/:userId/rest/:restId", addReview);
    app.delete("/api/project/rest/:restId/review/:reviewId",deleteReview);
    app.put("/api/project/rest/:restId/review/:reviewId", updateReviewById);


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

    function deleteReview(req, res){
        var restId = req.params.restId;
        var reviewId = req.params.reviewId;
        model_review.deleteReview(reviewId);
        var reviews = model_review.findAllReviewsForRest(restId);
        res.json(reviews);
    }

    function updateReviewById(req, res){
        var restId = req.params.restId;
        var reviewId = req.params.reviewId;
        var review = req.body;
        model_review.updateReviewById(reviewId, review);
        var reviews = model_review.findAllReviewsForRest(restId);
        res.json(reviews);

    }
};