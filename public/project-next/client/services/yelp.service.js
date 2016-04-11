"use strict";
(function () {
    angular
        .module("Eat'n'Review")
        .factory("YelpService",yelpService);

    function yelpService(){
        var api = {
            findRestbyNameLocation: findRestbyNameLocation,
            findRestDetailsbyId: findRestDetailsbyId
        };
        return api;

        function findRestbyNameLocation(restname, location, callback){
            if(!restname || restname == undefined){
                restname="";
            }
            console.log("yelp service", restname, location);
            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            var parameters = [];
            parameters.push(['term', restname]);
            parameters.push(['location', location]);
            parameters.push(['limit', 20]);
            parameters.push(['category_filter', 'restaurants']);
            parameters.push(['callback', 'angular.callbacks._0']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action': 'http://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

            //$http.jsonp(message.action, {params: parameterMap}).success(callback)
            //    .error(function(){
            //        console.log("error")
            //    });

            $.ajax({
                'url': message.action,
                'data': parameterMap,
                'cache': true,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                success: callback,
                error:function(){
                    console.log("Error when search with YelpService.findRestByLocation");
                }
            });

        }

        function findRestDetailsbyId(restId, callback){
            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };
            var parameters = [];
            parameters.push(['callback', 'angular.callbacks._0']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action': encodeURI('http://api.yelp.com/v2/business/'+restId),
                'method': 'GET',
                'parameters': parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

            //$http.jsonp(message.action, {params: parameterMap})
            //    .success(callback)
            //    .catch(function(data, status, headers, config){
            //        console.log(data);
            //    });
            $.ajax({
                'url': message.action,
                'data': parameterMap,
                'cache': true,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                success: callback,
                error:function(){
                    console.log("Error when search with YelpService.findRestDetailsById");
                }
            });
        }

    }
})();