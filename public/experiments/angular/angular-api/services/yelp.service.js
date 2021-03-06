"use strict";
(function () {
    angular
        .module("RestApp")
        .factory("YelpService",yelpService);

    function yelpService($http){
        var api = {
            findRestbyNameLocation: findRestbyNameLocation,
            findRestDetailsbyId: findRestDetailsbyId
        };
        return api;

        function findRestbyNameLocation(restname, location, callback){
            if(!restname){
                restname="";
            }
            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            var parameters = [];
            parameters.push(['term', restname]);
            parameters.push(['location', location]);
            parameters.push(['limit', 10]);
            parameters.push(['category_filter', 'restaurants']);
            parameters.push(['callback', 'angular.callbacks._0']);
            //parameters.push(['callback', 'JSON_CALLBACK']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action': 'http://api.yelp.com/v2/search',
                //'action': 'http://api.yelp.com/v2/search?callback=JSON_CALLBACK',
                'method': 'GET',
                'parameters': parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

            $http.jsonp(message.action, {params: parameterMap}).success(callback);

        }
        function randomString(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        function findRestDetailsbyId(restId, callback){
            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            var parameters = [];
            parameters.push(['callback', 'angular.callbacks._0']);
            //parameters.push(['callback', 'JSON_CALLBACK']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action': 'http://api.yelp.com/v2/business/'+restId,
                'method': 'GET',
                'parameters': parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

            //$http.jsonp(message.action, {params: parameterMap})
            //    .then(function(response){
            //        console.log(response);
            //    }, function(error){
            //        console.log(error);
            //        $http.jsonp(message.action, {params: parameterMap})
            //            .then(function(res){
            //                console.log(res);
            //            });
            //
            //    });


            $.ajax({
                'url': message.action,
                'data': parameterMap,
                'cache': true,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                success: callback
            });

            //$.ajax({
            //    url: message.action,
            //    data: {params: parameterMap},
            //    dataType: 'jsonp',
            //    success: function(response) {
            //        console.log(response);
            //    }
            //})

                //.success(
                //    function(response) {
                //        console.log(response);
                //    }
                //)
                //.catch(function(data, status, headers, config){
                //    console.log(data);
                //});
        }

    }
})();