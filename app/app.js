var app = angular.module("dogsApp", ["ngRoute"]);

app.config(function($routeProvider) {
  
    $routeProvider.
      when("/", {
        templateUrl: "app/components/home/home.html",
        controller: "homeCtrl"
      }).when("/breeds", {
        templateUrl: "app/components/breed/breedsListGallery.html",
        controller: "breedsListCtrl"
      }).when("/about", {
        templateUrl: "app/components/about/about.html"
      }).when("/breed/:name", {
        templateUrl: "app/components/breed/breedsGallery.html",
        controller: "breedGalleryCtrl"
      }).otherwise({
        template : "<h1>error</h1>"
      });
    
  })