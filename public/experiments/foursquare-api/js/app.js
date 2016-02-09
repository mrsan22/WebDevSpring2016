// IIFE (Immediately Invoked function expression) design pattern.
// When init gets called, it's guaranteed that page has been loaded.

(function (){
  $(init);

  var $restNametxt;
  var $locationtxt;
  var $searchRestbtn;
  var loc, food_item, lim;

  //Foursquare API details
  var client_id = "NAI3NNBC3VMAH4J4QGIPU3GMUAAYFZLL4DKUHJIYTJE11T0S";
  var client_secret = "MWQ5YCT0QGQMTIEZXCDEXB0FE1YKMC3JGIIJGW3HU3AJNNTR";
  var food_id = "4d4b7105d754a06374d81259";
  var apiUrl = "https://api.foursquare.com/v2/venues/search?client_id="+client_id+"&client_secret="+client_secret+"" +
      "&v=20130815&near=loc&query=food_item&categoryId="+food_id+"&limit=Lim";

    function init(){
        //alert("hello from foursquare api")
      $restNametxt = $("#restNametxt");
      $locationtxt = $("#locationtxt");
      $searchRestbtn = $("#searchRestbtn");

      $searchRestbtn.click(searchFourSqrApi);


    }

    function searchFourSqrApi(){
      var foodName = $restNametxt.val();
      var location = $locationtxt.val();
      var url = apiUrl
          .replace("food_item", foodName)
          .replace("loc", location)
          .replace("Lim", 10);
      //alert(url)

      // Ajax call on success passes the response to callback function i.e. to success parameter function
      $.ajax({
          url : url,
          success : renderRestList
          //success : function (response){
          //  console.log(response);
          //}

      });

    }

    function renderRestList(response){
      console.log(response);
    }

})();