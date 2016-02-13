// IIFE (Immediately Invoked function expression) design pattern.
// When init gets called, it's guaranteed that page has been loaded.

(function (){
  $(init);

  var $restNametxt;
  var $locationtxt;
  var $searchRestbtn;
  var $tbody;
  //var loc, food_item, lim;

  ////Foursquare API details
  //var client_id = "NAI3NNBC3VMAH4J4QGIPU3GMUAAYFZLL4DKUHJIYTJE11T0S";
  //var client_secret = "MWQ5YCT0QGQMTIEZXCDEXB0FE1YKMC3JGIIJGW3HU3AJNNTR";
  //var food_id = "4d4b7105d754a06374d81259";
  //var apiUrl = "https://api.foursquare.com/v2/venues/search?client_id="+client_id+"&client_secret="+client_secret+"" +
  //    "&v=20130815&near=loc&query=food_item&categoryId="+food_id+"&limit=Lim";


  function init(){

    $restNametxt = $("#restNametxt");
    $locationtxt = $("#locationtxt");
    $searchRestbtn = $("#searchRestbtn");
    $tbody = $("#searchResults tbody");

    $searchRestbtn.click(searchYelpApi);

    function searchYelpApi() {
      var terms = $restNametxt.val();
      var near = $locationtxt.val();
      var limit = 2;
      var category_filter = "restaurants";
      var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
      };
      parameters = [];
      parameters.push(['term', terms]);
      parameters.push(['location', near]);
      parameters.push(['limit', 10]);
      parameters.push(['category_filter', 'restaurants']);
      parameters.push(['callback', 'cb']);
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
      parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
      //console.log(parameterMap);
      $.ajax({
        'url': message.action,
        'data': parameterMap,
        'cache': true,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': renderRestList
      });

    }
    function renderRestList(response, textStats, XMLHttpRequest){
      $tbody.empty();
      console.log(response);
      //console.log(textStats); //prints success

      var totalResult = response.total;
      var foodPlaces = response.businesses

      for (var r=0; r<foodPlaces.length; r++){
        var rest = foodPlaces[r];
        //console.log(rest)

        var rest_id = rest.id;
        var rest_name = rest.name;
        var image = rest.image_url;
        var rating_img = rest.rating_img_url;

        var $tr = $("<tr>");
        var $td = $("<td>");
        var $img = $("<img>")
            .attr("src", image)
            .attr("id", rest_id)
            .click(restaurantDetails);

        var $img_rating = $("<img>").attr("src", rating_img)

        $td.append(rest_id);
        $tr.append($td);

        var $td = $("<td>");
        $td.append(rest_name)
            .attr("id", rest_id)
            .click(restaurantDetails)
        $tr.append($td);

        var $td = $("<td>");
        $td.append($img_rating);
        $tr.append($td);

        var $td = $("<td>");
        $td.append($img);
        $tr.append($td);

        $tbody.append($tr)


      }

    }

    function restaurantDetails(event){
      //alert("Restaurant Details")
      //console.log(event);

      var img = $(event.currentTarget);
      var restid = img.attr("id")
      //alert(restid)
      details_url = "https://api.yelp.com/v2/business/bid";
      url = details_url.replace("bid",restid);
      alert(url)
      //Write Bussiness Yelp Ajax call here using restid
      var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
      };
      parameters = [];
      parameters.push(['actionlinks', true]);
      parameters.push(['callback', 'cb']);
      parameters.push(['oauth_consumer_key', auth.consumerKey]);
      parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
      parameters.push(['oauth_token', auth.accessToken]);
      parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
      var message = {
        'action': url,
        'method': 'GET',
        'parameters': parameters
      };
      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, accessor);
      var parameterMap = OAuth.getParameterMap(message.parameters);
      parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
      //console.log(parameterMap);
      $.ajax({
        'url': message.action,
        'data': parameterMap,
        'cache': true,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': renderRestDetails
      });


      function renderRestDetails(restDetails, textStats, XMLHttpRequest){
        console.log(restDetails);
        //console.log(textStats);

      }


    }
  }
  //    //alert("hello from foursquare api")
  //  $restNametxt = $("#restNametxt");
  //  $locationtxt = $("#locationtxt");
  //  $searchRestbtn = $("#searchRestbtn");
  //
  //  $searchRestbtn.click(searchFourSqrApi);
  //
  //
  //}
  //
  //function searchFourSqrApi(){
  //  var foodName = $restNametxt.val();
  //  var location = $locationtxt.val();
  //  var url = apiUrl
  //      .replace("food_item", foodName)
  //      .replace("loc", location)
  //      .replace("Lim", 10);
  //  //alert(url)
  //
  //  // Ajax call on success passes the response to callback function i.e. to success parameter function
  //  $.ajax({
  //      url : url,
  //      success : renderRestList
  //      //success : function (response){
  //      //  console.log(response);
  //      //}
  //
  //  });
  //
  //}
  //
  //function renderRestList(response){
  //  console.log(response);
  //}

})();