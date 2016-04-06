"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .controller("SearchHomeController", SearchHomeController);

    function SearchHomeController($scope, FourSquareService, YelpService, $location, GoogleService){
        var vm = this;

        vm.search = search;
        vm.callSearch = callSearch;
        vm.getLocation = getLocation;
        vm.showPosition = showPosition;
        vm.showError = showError;

        function init(){
            $('#carousel').carousel({
                interval: 5000 //changes the speed
            });

            vm.$location = $location;

            FourSquareService.findPopularRestByLocation(
                function(response){
                    var imageurl_lst = [];
                    var restNames = [];
                    var ids = [];
                    var popularRestLst = response.response.groups[0].items;
                    for (var i in popularRestLst){
                        //console.log(popularRestLst[i].venue.photos.groups[0].items[0]);
                        imageurl_lst.push(popularRestLst[i].venue.photos.groups[0].items[0].prefix+'original'
                            +popularRestLst[i].venue.photos.groups[0].items[0].suffix);
                        restNames.push(popularRestLst[i].venue.name);
                        ids.push(popularRestLst[i].venue.id);


                    }
                    var nameImgObj = {
                        "id":ids,
                        "names" :restNames,
                        "images" : imageurl_lst
                    };
                    //console.log(nameImgObj);
                    vm.popularRestImages  = imageurl_lst;
                    vm.popularRestaurants = nameImgObj;
                }
            );
        }
        init();


        function search(restname, location){
            //$location.url("/search/restname="+$scope.restname+"&location="+$scope.location);
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    //Take out of id from this response and pass it to below URL
                    var rest_id = response.businesses[0].id;
                    vm.$location.url('/detail/'+rest_id);
                    $scope.$apply();
                }
            )
        }

        function callSearch(restname, location){
            if(typeof location != 'string') {
                YelpService.findRestbyNameLocation(
                    restname,
                    location.formatted_address,
                    function (response) {
                        vm.data = response;
                        vm.$location.url('/search/restname=' + restname + '&location=' + location.formatted_address);
                        $scope.$apply();
                    }
                )
            }
            else{
                YelpService.findRestbyNameLocation(
                    restname,
                    location,
                    function (response) {
                        vm.data = response;
                        vm.$location.url('/search/restname=' + restname + '&location=' + location);
                        $scope.$apply();
                    }
                )
            }
        }


        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                console.log("Geolocation is not supported by this browser.");

            }
        }

        function showPosition(position){
            console.log("Latitude:" + position.coords.latitude+"<br>Longitude: " + position.coords.longitude);
            var latlon = position.coords.latitude + "," + position.coords.longitude;
            GoogleService
                .findAddressByLatLong(latlon)
                .then(function (place) {
                        console.log(place);
                        console.log(place.data.results[0].formatted_address);
                        vm.loc = place.data.results[0].formatted_address;
                    },
                    function (error) {
                        console.log("Failed to retrieve place name, given the lat&long", error);
                    })

        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
            }
        }




    }
})();