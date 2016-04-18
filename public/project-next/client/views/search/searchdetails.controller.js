"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, YelpService, ReviewService, UserService, $rootScope, RestService){
        var vm = this;
        vm.addReview = addReview;
        vm.deleteReview = deleteReview;
        vm.editReview  = editReview;
        vm.disableEditor = disableEditor;
        vm.save = save;
        vm.initMap = initMap;
        vm.restAvgRating = restAvgRating;
        vm.findUserByReviewUserId = findUserByReviewUserId;
        vm.likeRest = likeRest;
        vm.undolikeRest = undolikeRest;

        vm.defaultReview = {
                "title":"",
                "rating": 0,
                "editableRating": true,
                "createdOn" : Date.now()
            };

        function init(){
            vm.restId = $routeParams.restId;
            $('[data-toggle="tooltip"]').tooltip();

            $rootScope.$on("$routeChangeSuccess", function(){
                window.scrollTo(0,0);
            });

            YelpService.findRestDetailsbyId(
                vm.restId,
                function(response){
                    var imgurl_lst;
                    imgurl_lst = response.image_url.split("/");
                    imgurl_lst.splice(-1,1);
                    imgurl_lst.push('o.jpg');
                    vm.imageurl = imgurl_lst.join("/");
                    console.log(response);
                    vm.rest = response;
                    //vm.directionUrl = "https://www.google.com/maps?daddr="
                    //    +vm.rest.location.coordinate.latitude +","+vm.rest.location.coordinate.longitude;
                    vm.directionUrl =  vm.directionUrl = "https://www.google.com/maps?daddr="
                        +vm.rest.name+vm.rest.location.address[0]+vm.rest.location.city;
                    initMap(vm.rest);
                    $scope.$apply();
                }
            );

            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response.data) {
                        vm.currentUser = response.data;
                        isliked();
                    }
                    else {
                        vm.readonly = true;
                    }
                }, function (error) {
                    console.log("Error in calling 'getCurrentUser'",error.statusText);
                });


            ReviewService
                .findAllReviewsForRest(vm.restId)
                .then(function (response) {
                    console.log(response.data);
                    vm.reviews = response.data;
                    vm.findUserByReviewUserId(vm.reviews);
                    restAvgRating(vm.reviews);
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
                zoom: 14,
                center: myLatLng,
                scrollwheel: false
            });
            var contentString = rest.name +"<br/>"+rest.location.address[0]+"<br/>"+rest.location.city +"<br/>"+
                "<a target=_blank id='link' href='http://maps.google.com/maps?q="+rest.name+
                rest.location.address[0]+rest.location.city +"'>View on Google Maps</a>";

            //document.getElementById('link').href = url;

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: rest.name
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
                    vm.findUserByReviewUserId(vm.reviews);
                    vm.selectedreview = -1;
                    vm.defaultReview = {};
                    restAvgRating(vm.reviews);
                    RestService.addRest(vm.rest);

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
                        restAvgRating(vm.reviews);
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
                       vm.findUserByReviewUserId(vm.reviews);
                       vm.selectedreview = -1;
                       restAvgRating(vm.reviews);
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

        function restAvgRating(reviews){
            var avgRating = 0;
            for(var each in reviews){
                 avgRating += parseInt(reviews[each].rating);
            }
            vm.avgRating = avgRating / reviews.length;
            if (isNaN(vm.avgRating)) {
                vm.avgRating = 0;
            }
        }

        function findUserByReviewUserId(reviews) {
            reviews.forEach(function (element, index, arr) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                        if (response.data) {
                            reviews[index].username=response.data.username;
                            reviews[index].imgUrl = response.data.imgUrl;
                        }
                    },
                        function (error) {
                            console.log(error.statusText);
                        });
            })
        }

        function likeRest(restId){
            UserService
                .addLike(restId, vm.currentUser._id)
                .then(function (response) {
                    if(response.status == 200){
                        vm.isliked = true;
                        RestService.addRest(vm.rest);
                    }
                }, function (error) {
                    console.log("Error in adding like for a Restaurant", error.statusText);
                })
        }

        function isliked(){
            UserService
                .isLiked(vm.restId, vm.currentUser._id)
                .then(function (response) {
                    if(response.data){
                        vm.isliked = true;
                    }
                    else{
                        vm.isliked = false;
                    }
                }, function (error) {
                    console.log("Error in retrieving restid from likes Array of current User", error.statusText);
                })
        }

        function undolikeRest(restId){
            UserService
                .unLike(restId, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200 && (response.data.nModified == 1 || response.data.n == 1)){
                        vm.isliked = false;
                    }
                }, function (error) {
                    console.log("Error in removing like for a Restaurant", error.statusText);
                })
        }
    }

})();