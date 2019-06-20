app.controller("homeCtrl", function($scope, $log, $location) {
    $scope.enterApp = function() {
        $location.path("/breeds");
    }
});