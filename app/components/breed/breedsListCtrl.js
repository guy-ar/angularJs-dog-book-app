app.controller("breedsListCtrl", function($scope, $log, $location, breedSrv) {
    
    // initiate the data
    $scope.breeds = [];
    
    
    breedSrv.getBreeds().then(function(breeds) {
      $scope.breeds = breeds;
    }, function(err) {
      $log.error(err);
    })
     

    $scope.query = "";
    
    $scope.filterQuery = function(breed) {
       $log.info("breed.name:" + breed.name);
      let nameUpper = breed.name.toUpperCase();
            
      if (nameUpper.includes($scope.query.toUpperCase())) {
          return true;
      } else {
        return false;
      }
    }

    $scope.refresh = function() {
      breedSrv.refreshBreeds();
    }
    
    
    $scope.selectedBreed = null;
    
    
  });