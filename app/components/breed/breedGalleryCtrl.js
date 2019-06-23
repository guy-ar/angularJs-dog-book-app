app.controller("breedGalleryCtrl", function($scope, $log, $routeParams, breedSrv) {
  /* "bounce", "flash", "pulse", "rubberBand",
          "shake", "swing", "tada", "wobble", "jello",

          */
  const ANIMATION_EXIT_ARR = [ "bounceOut",
          "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp",
           "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig",
           "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig",
          "flipOutX", "flipOutY", "lightSpeedOut", "rotateOut", "rotateOutDownLeft",
           "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideOutUp",
           "slideOutDown", "slideOutLeft", "slideOutRight", "zoomOut", "zoomOutDown",
           "zoomOutLeft", "zoomOutRight", "zoomOutUp", "rollOut"
          ];
  const ANIMATION_ENTER_ARR = ["bounce", "flash", "pulse", "rubberBand", "shake",
          "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", 
          "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", 
          "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", 
          "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flipInX", "flipInY", 
          "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", 
          "rotateInUpLeft", "rotateInUpRight", "slideInUp", "slideInDown", 
          "slideInLeft", "slideInRight", "zoomIn", "zoomInDown", "zoomInLeft", 
          "zoomInRight", "zoomInUp", "rollIn"
        ]
    
          
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
      $("#myModal").modal("show");
    }

    function setAnim(x) {
      $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + x + '  animated');
    };
    $('#myModal').on('show.bs.modal', function (e) {
      var anim = ANIMATION_ENTER_ARR[Math.floor(Math.random() * ANIMATION_ENTER_ARR.length)];
      //"bounceIn";
      setAnim(anim);
    })
    $('#myModal').on('hide.bs.modal', function (e) {
      var anim = ANIMATION_EXIT_ARR[Math.floor(Math.random() * ANIMATION_EXIT_ARR.length)];//"flipOutX";
      setAnim(anim);
    })
  });

