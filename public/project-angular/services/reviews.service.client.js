"use strict";
(function() {
    angular
        .module("Eat'n'Review")
        .factory("ReviewService", ReviewService);

    function ReviewService(){

        var defaultRating = [{
            title : 'Rating 3',
            description : 'I\'m editable...',
            rating : 0,
            basedOn : 5,
            starsCount : 5,
            iconClass : 'fa fa-star',
            editableRating : true,
            showGrade : false
        }];

        var ratings = [
            {
                "_id" :0,
                title : 'Rating 2',
                description : 'avana-sushi-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"avana-sushi-boston",
                "userId":234,
                rating : 1,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            },
            {
                "_id" :1,
                title : 'Rating 2.5',
                description : 'avana-sushi-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"avana-sushi-boston",
                "userId":123,
                rating : 2.5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            },
            {
                "_id" :2,
                title : 'Rating 3',
                description : 'pho-basil-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"pho-basil-boston",
                "userId":123,
                rating : 3,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            },
            {
                "_id" :3,
                title : 'Rating 5',
                description : 'pho-basil-boston Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque' +
                                ' ante sollicitudin commodo.',
                restId:"pho-basil-boston",
                "userId":234,
                rating : 5,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: 1397490980837
            }
        ];

        //Declaration of interface
        var reviewsServiceApi = {
          //findAllReviewsForUser : findAllReviewsForUser
            findAllReviewsForRest : findAllReviewsForRest,
            loadDefaultRating : loadDefaultRating,
            addReview : addReview
        };

        return reviewsServiceApi;

        //Implementation of interfaces
        function findAllReviewsForRest(restId, callback){
            var reviewsArray = [];
            for(var each in ratings){
                if(ratings[each].restId == restId){
                    reviewsArray.push(ratings[each]);
                    //console.log("All reviews for this restaurant", reviewsArray);
                }
            }
            callback(reviewsArray);
        }

        function loadDefaultRating(callback){
            callback(defaultRating);
        }

        function addReview(rating, review, callback){
            ratings.unshift({
                title : 'Rating',
                restId:"avana-sushi-boston",
                description : review,
                rating : rating,
                basedOn : 5,
                starsCount : 5,
                iconClass : 'fa fa-star',
                editableRating : false,
                showGrade : false,
                createdOn: Date.now()
            });
            callback(ratings);
        }

    }

})();