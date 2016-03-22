"use strict";
(function () {
    angular
        .module("RestApp")
        .controller("SearchHomeController", SearchHomeController);

    function SearchHomeController($scope, FourSquareService, YelpService, $location){
        $scope.search = search;

        function init(){
            $('#carousel').carousel({
                interval: 5000 //changes the speed
            })
        }
        init();
            FourSquareService.findPopularRestByLocation(
                function(response){
                    var imageurl_lst = [];
                    var restNames = [];
                    var ids = [];
                    console.log(response);
                    console.log(response.response.groups[0].items);
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
                    console.log(nameImgObj);
                    $scope.popularRestImages  = imageurl_lst;
                    $scope.popularRestaurants = nameImgObj;
                    //console.log($scope.popularRestaurants);
                }
            );

        function search(restname, location){
            //$location.url("/search/restname="+$scope.restname+"&location="+$scope.location);
            YelpService.findRestbyNameLocation(
                restname,
                location,
                function(response){
                    //Take out of id from this response and pass it to below URL
                    console.log(response);
                    var rest_id = response.businesses[0].id;
                    $location.url('/detail/'+rest_id);
                }
            )
        }


        //$scope.popularRestImages = imageurl_lst;



    }
})();