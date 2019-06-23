app.controller("breedGalleryCtrl", function($scope, $log, $routeParams, breedSrv) {
    
    // initiate the data
    $scope.breedImgArr = [];
    $scope.name = $routeParams.name;
    $scope.selectedImg = "";

   
    breedSrv.getImgForBreed($routeParams.name).then(function(imgArr) {
      $scope.breedImgArr = imgArr;
    }, function(err) {
      $log.error(err);
    })

    $scope.selectImage = function(imgUrl) {
      $scope.selectedImg = imgUrl;
      $log.info("selectedImg = " + imgUrl);
      $("#myModal").modal()
    }
  });