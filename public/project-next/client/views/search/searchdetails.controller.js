"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, ReviewService, UserService){
        var vm = this;
        vm.addReview = addReview;
        vm.deleteReview = deleteReview;
        //$scope.editReview  = editReview;
        //$scope.disableEditor = disableEditor;
        //$scope.save = save;
        vm.initMap = initMap;

        vm.defaultReview = [
            {
                "title": "Rating 3",
                "rating": 0,
                "basedOn": 5,
                "starsCount": 5,
                "iconClass": "fa fa-star",
                "editableRating": true,
                "showGrade": false
            }
        ];

        function init(){
            vm.restId = $routeParams.restId;

            YelpService.findRestDetailsbyId(
                vm.restId,
                function(response){
                    var imgurl_lst;
                    imgurl_lst = response.image_url.split("/");
                    imgurl_lst.splice(-1,1);
                    imgurl_lst.push('o.jpg');
                    vm.imageurl = imgurl_lst.join("/");
                    vm.rest = response;
                    initMap(vm.rest);
                    $scope.$apply();
                }
            );

            ReviewService
                .findAllReviewsForRest(vm.restId)
                .then(function (response) {
                    console.log(response.data);
                    vm.reviews = response.data;
                    UserService
                        .getCurrentUser()
                        .then(function (response) {
                            if(response.data) {
                                vm.currentUser = response.data;
                                console.log(vm.currentUser);
                                for (var i in vm.reviews) {
                                    //var userObj = UserService.findUserById(vm.reviews[i].userId);
                                    vm.reviews[i]["firstName"] = vm.currentUser.firstName;
                                    vm.reviews[i]["lastName"] = vm.currentUser.lastName;
                                }
                            }
                            else{
                                console.log("No User logged in");
                                for (var i in vm.reviews) {
                                    console.log("i",i);
                                    UserService
                                        .findUserById(vm.reviews[i].userId)
                                        .then(function (response) {
                                            console.log(response.data);
                                        if(response.data){
                                            vm.reviews[i]["firstName"] = response.data.firstName;
                                            vm.reviews[i]["lastName"] = response.data.lastName;
                                        }
                                            console.log(vm.reviews);
                                    },
                                        function (error) {
                                            console.log("Error in retrieving username for all reviews",error.statusText);
                                        });
                                }
                                $scope.readonly = true;
                            }

                        }, function (error) {
                            console.log("Error in calling 'getCurrentUser'",error.statusText);
                        });


                },
                    function (error) {
                       console.log("Error in calling 'findAllReviewsForRest'",error.statusText);
                    });

        }
        init();


        function initMap(rest) {
            var bounds = new google.maps.LatLngBounds();
            var myLatLng = {lat:rest.location.coordinate.latitude, lng:rest.location.coordinate.longitude};

           var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: myLatLng
            });

            var contentString = "Restaurant";
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });

            bounds.extend(marker.getPosition());

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }

        function addReview(review){
            console.log(review);
            ReviewService
                .addReview(vm.restId, vm.currentUser._id, review)
                .then(function (response) {
                    console.log(response.data);
                    vm.reviews = response.data;
                    vm.reviews[0]["firstName"] = vm.currentUser.firstName;
                    vm.reviews[0]["lastName"] = vm.currentUser.lastName;
                },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        //function deleteReview(ratingIndex){
        //    ReviewService.deleteReviewById(
        //        $scope.ratings[ratingIndex]._id,
        //        function(response){
        //            ReviewService.findAllReviewsForRest(
        //                $scope.restId,
        //                function(response){
        //                    $scope.ratings = response;
        //                }
        //            );
        //        }
        //    )
        //}
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

        //function editReview(ratingIndex){
        //    //ReviewService.editReviewById(
        //    //    ratingIndex,
        //    //    function (response) {
        //    //
        //    //    }
        //    //);
        //    $scope.selectedreview = ratingIndex;
        //    $scope.editablereview = $scope.ratings[ratingIndex].description;
        //    $scope.temp_rating = $scope.ratings[ratingIndex].rating;
        //}
        //
        //
        //function save(reviewToEdit, ratingIndex){
        //    $scope.ratings[ratingIndex].description = reviewToEdit;
        //    //$scope.disableEditor();
        //    $scope.selectedreview = -1;
        //    //$scope.createdOn = Date.now();
        //    //$scope.latestDate = true;
        //}
        //
        //function disableEditor(ratingIndex){
        //    $scope.selectedreview = -1;
        //    $scope.ratings[ratingIndex].rating = $scope.temp_rating;
        //    $scope.sameDate = true;
        //
        //}
    }

})();