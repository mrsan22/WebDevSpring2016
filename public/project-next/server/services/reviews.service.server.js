"use strict";
module.exports = function (app, model_review) {

    //Declaration
    app.get("/api/project/getReviews:restId", findAllReviewsForRest);
    app.post("/api/project/user/:userId/rest/:restId", addReview);
    app.delete("/api/project/rest/:restId/review/:reviewId",deleteReview);
    app.put("/api/project/rest/:restId/review/:reviewId", updateReviewById);
    app.get("/api/project/restAvgRating/:restId", getAvgRatingRest);


    //Implementation
    function findAllReviewsForRest(req, res){
        var restId = req.params.restId;
        //var reviews = model_review.findAllReviewsForRest(restId);
        //res.json(reviews);
        model_review
            .findAllReviewsForRest(restId)
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status (400).send ("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function addReview(req, res){
        var userId = req.params.userId;
        var restId = req.params.restId;
        var review = req.body;
        //model_review.addReview(userId, restId, review);
        //var reviews = model_review.findAllReviewsForRest(restId);
        //res.json(reviews);
        model_review
            .addReview(userId, restId, review)
            .then(function (response) {
                return model_review.findAllReviewsForRest(restId);
            }, function (error) {
                res.status (400).send ("Error in adding review of restaurant", error.statusText);
            })
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status (400).send ("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function deleteReview(req, res){
        var restId = req.params.restId;
        var reviewId = req.params.reviewId;
        //model_review.deleteReview(reviewId);
        //var reviews = model_review.findAllReviewsForRest(restId);
        //res.json(reviews);
        model_review
            .deleteReview(reviewId)
            .then(function (response) {
                return model_review.findAllReviewsForRest(restId);
            }, function (error) {
                res.status (400).send ("Error in deleting review of restaurant", error.statusText);
            })
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status (400).send ("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function updateReviewById(req, res){
        var restId = req.params.restId;
        var reviewId = req.params.reviewId;
        var review = req.body;
        //model_review.updateReviewById(reviewId, review);
        //var reviews = model_review.findAllReviewsForRest(restId);
        //res.json(reviews);
        model_review
            .updateReviewById(reviewId, review)
            .then(function (response) {
                return model_review.findAllReviewsForRest(restId);
            }, function (error) {
                res.status (400).send ("Error in updating review for a restaurant", error.statusText);
            })
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status (400).send ("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function getAvgRatingRest(req, res){
        var restId = req.params.restId;
        var avgRating = model_review.getAvgRatingRest(restId);
        res.json(avgRating);
    }
};