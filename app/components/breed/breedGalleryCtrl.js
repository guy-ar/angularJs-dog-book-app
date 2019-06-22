app.controller("breedGalleryCtrl", function($scope, $log, $routeParams, breedSrv) {
    
    // initiate the data
    $scope.breedImgArr = [];
    $scope.name = $routeParams.name;
   
    breedSrv.getImgForBreed($routeParams.name).then(function(imgArr) {
      $scope.breedImgArr = imgArr;
    }, function(err) {
      $log.error(err);
    })

  });