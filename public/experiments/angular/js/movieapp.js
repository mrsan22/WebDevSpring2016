/**
 * Created by skumar on 2/13/16.
 */

(function(){
    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", MovieListController);

    function MovieListController($scope){
        //These movies could come from API or our Database. It might have any schema.
        var movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Avatar", director: "James Cameron"},
            {id: 345, title: "Aliens", director: "James Cameron"}
        ];

        $scope.movies = movies;// movies is local variable and $scope.movies is variable that will be made available for rendering to the view.


        //event handler declaration
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;


        //event handler implementation
        function addMovie (movie){
        //console.log($scope.movie)
        var newMovie = {
            id : movie.id,
            title : movie.title,
            director : movie.director
        };
        $scope.movie = "";
        $scope.movies.push(newMovie);
        }

        function removeMovie(movie){
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }


}

})();
