"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, ReviewService, UserService){
        var vm = this;
        vm.addReview = addReview;
        vm.deleteReview = deleteReview;
        vm.editReview  = editReview;
        vm.disableEditor = disableEditor;
        vm.save = save;
        vm.initMap = initMap;

        vm.defaultReview = {
                "title": "Rating 3",
                "rating": 0,
                "basedOn": 5,
                "starsCount": 5,
                "iconClass": "fa fa-star",
                "editableRating": true,
                "showGrade": false
            };

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
                                vm.readonly = true;
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
                    vm.selectedIndex = -1;
                    vm.reviews = response.data;
                    vm.reviews[0]["firstName"] = vm.currentUser.firstName;
                    vm.reviews[0]["lastName"] = vm.currentUser.lastName;
                    vm.selectedreview = -1;
                    vm.defaultReview.rating = '';
                    vm.defaultReview.review = '';

                },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function deleteReview(ratingIndex){
            ReviewService
                .deleteReviewById( vm.restId, vm.reviews[ratingIndex]._id)
                .then(function (response) {
                        vm.reviews = response.data;
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function editReview(ratingIndex){
            vm.selectedreview = ratingIndex;
            console.log(vm.selectedreview);
            //vm.editablereview = vm.reviews[ratingIndex].review;
            var editablereview = {
                "_id": vm.reviews[ratingIndex]["_id"],
                "title": vm.reviews[ratingIndex]["title"],
                "review": vm.reviews[ratingIndex]["review"],
                "createdOn": vm.reviews[ratingIndex]["createdOn"],
                "restId": vm.reviews[ratingIndex]["restId"],
                "userId": vm.reviews[ratingIndex]["userId"],
                "rating": vm.reviews[ratingIndex]["rating"]
            };
            vm.editablereview = editablereview;
            vm.temp_rating = vm.reviews[ratingIndex].rating;

        }

        function save(review, ratingIndex){
            console.log(review);
           ReviewService
               .updateReviewById(vm.restId, vm.reviews[ratingIndex]._id, review)
               .then(function (response) {
                       console.log(response.data);
                       vm.reviews = response.data;
                       vm.selectedreview = -1;
                   },
                   function (error) {
                       console.log(error.statusText);
                   });
        }

        function disableEditor(ratingIndex){
            vm.selectedreview = -1;
            vm.reviews[ratingIndex].rating = vm.temp_rating;
            vm.sameDate = true;

        }
    }

})();