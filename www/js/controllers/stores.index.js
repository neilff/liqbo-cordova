angular.module('lcboApp.controllers')
    .controller('StoresIndexCtrl', function($scope) {

        console.log('IndexCtrl');

        $scope.toggleSlide = function() {
            $scope.sideMenuController.toggleLeft();
        }
    });