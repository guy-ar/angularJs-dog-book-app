app.controller("breedGalleryCtrl", function($scope, $log, $location, breedSrv) {
    
    // initiate the data
    $scope.breeds = [];
    
    
    breedSrv.getBreeds().then(function(breeds) {
      $scope.breeds = breeds;
    }, function(err) {
      $log.error(err);
    })
     

    $scope.query = "";
    
    $scope.refresh = function() {
      $location.path("/breeds");
    }
    
    
    $scope.selectedBreed = null;
    
    
  });