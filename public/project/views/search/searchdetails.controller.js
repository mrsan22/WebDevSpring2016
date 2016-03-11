"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, ReviewService, UserService){

        function init(){
            $scope.addReview = addReview;
            $scope.deleteReview = deleteReview;
            $scope.editReview  = editReview;
            $scope.disableEditor = disableEditor;
            $scope.save = save;

            
            $scope.restId = $routeParams.restId;

            ReviewService.findAllReviewsForRest(
                $scope.restId,
                function(response){
                    $scope.ratings = response;
                    if($scope.user) {
                        for (var i in $scope.ratings) {
                            var userObj = UserService.findUserById($scope.ratings[i].userId);
                            $scope.ratings[i]["firstName"] = userObj.firstName;
                            $scope.ratings[i]["lastName"] = userObj.lastName;
                        }
                    }
                    else{
                        for (var i in $scope.ratings) {
                            var userObj = UserService.findUserById($scope.ratings[i].userId);
                            $scope.ratings[i]["firstName"] = userObj.firstName;
                            $scope.ratings[i]["lastName"] = userObj.lastName;
                        }
                        $scope.readonly = true;
                    }
                }
            );



            ReviewService.loadDefaultRating(
                function(response){
                    $scope.defaultRating = response;
                }
            );

        }
        init();

        YelpService.findRestDetailsbyId(
            $scope.restId,
            function(response){
                var imgurl_lst;
                imgurl_lst = response.image_url.split("/");
                imgurl_lst.splice(-1,1);
                imgurl_lst.push('o.jpg');
                $scope.imageurl = imgurl_lst.join("/");
                $scope.rest = response;
                $scope.$apply();
            }
        );

        function addReview(rating, review, user){
            if(!user){
                user={};
                user.userId = 123;
            }
            ReviewService.addReview(
                $scope.restId,
                user.userId,
                rating,
                review,
                function (response) {
                    console.log(response);
                    ReviewService.findAllReviewsForRest(
                        $scope.restId,
                        function(response){
                            $scope.user = user;
                            $scope.ratings = response;
                                $scope.ratings[0]["firstName"] = user.firstName;
                                $scope.ratings[0]["lastName"] = user.lastName;

                        }
                    );
                }
            )
        }

        function deleteReview(ratingIndex){
            ReviewService.deleteReviewById(
                $scope.ratings[ratingIndex]._id,
                function(response){
                    ReviewService.findAllReviewsForRest(
                        $scope.restId,
                        function(response){
                            $scope.ratings = response;
                        }
                    );
                }
            )
        }
        
        function editReview(ratingIndex){
            //ReviewService.editReviewById(
            //    ratingIndex,
            //    function (response) {
            //
            //    }
            //);
            $scope.selectedreview = ratingIndex;
            $scope.editablereview = $scope.ratings[ratingIndex].description;
            //$scope.temp_rating = $scope.ratings[ratingIndex].rating;
        }


        function save(reviewToEdit, ratingIndex){
            $scope.ratings[ratingIndex].description = reviewToEdit;
            $scope.disableEditor();
            //$scope.selectedreview = -1;
        }

        function disableEditor(ratingIndex){
            $scope.selectedreview = -1;
            //$scope.ratings[ratingIndex].rating = $scope.temp_rating;

        }
    }

})();