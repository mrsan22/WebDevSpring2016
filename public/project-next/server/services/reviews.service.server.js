"use strict";
var q = require("q");
module.exports = function (app, model_review, model_rest) {

    //Declaration
    app.get("/api/project/getReviews:restId", findAllReviewsForRest);
    app.post("/api/project/user/:userId/rest/:restId", addReview);
    app.delete("/api/project/rest/:restId/review/:reviewId", deleteReview);
    app.put("/api/project/rest/:restId/review/:reviewId", updateReviewById);
    app.get("/api/project/rest/getReviews/user:userId", findAllReviewsByUserId);

    //Implementation
    function findAllReviewsForRest(req, res) {
        var restId = req.params.restId;
        model_review
            .findAllReviewsForRest(restId)
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status(400).send("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function addReview(req, res) {
        var userId = req.params.userId;
        var restId = req.params.restId;
        var review = req.body;
        model_review
            .addReview(userId, restId, review)
            .then(function (response) {
                return model_review.findAllReviewsForRest(restId);
            }, function (error) {
                res.status(400).send("Error in adding review of restaurant", error.statusText);
            })
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status(400).send("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function deleteReview(req, res) {
        var restId = req.params.restId;
        var reviewId = req.params.reviewId;
        model_review
            .deleteReview(reviewId)
            .then(function (response) {
                return model_review.findAllReviewsForRest(restId);
            }, function (error) {
                res.status(400).send("Error in deleting review of restaurant", error.statusText);
            })
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status(400).send("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function updateReviewById(req, res) {
        var restId = req.params.restId;
        var reviewId = req.params.reviewId;
        var review = req.body;
        model_review
            .updateReviewById(reviewId, review)
            .then(function (response) {
                return model_review.findAllReviewsForRest(restId);
            }, function (error) {
                res.status(400).send("Error in updating review for a restaurant", error.statusText);
            })
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status(400).send("Error in finding all reviews of restaurant", error.statusText);
            });
    }

    function findAllReviewsByUserId(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        model_review
            .findAllReviewsByUserId(userId)
            .then(function (reviews) {
                var promiseArray = [];
                var result = [];

                reviews.forEach(function (element, index, arr) {
                    promiseArray
                        .push(
                            model_rest
                                .findRestById(element.restId)
                                .then(function (restaurant) {
                                    if (restaurant) {
                                        var review = JSON.parse(JSON.stringify(element));
                                        review.restaurant = restaurant;
                                        console.log(review);
                                        result.push(review);
                                    }
                                }, function (error) {
                                    res.status(400).send("Error in finding Restaurant By Id", error.statusText);
                                })
                        )
                });
                q.all(promiseArray)
                    .then(function (response) {
                        res.json(result);

                    }, function (error) {
                        res.status(400).send("Error in finding Restaurant By Id", error.statusText);
                    })
            }, function (error) {
                res.status(400).send(error.statusText);
            })
    }

};