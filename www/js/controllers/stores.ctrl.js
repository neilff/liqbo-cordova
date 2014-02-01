angular.module('lcboApp.controllers')
    .controller('StoresCtrl', function($scope) {

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            options: {
                overviewMapControl: false,
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false
            }
        };

        console.log('IndexCtrl');

        $scope.toggleSlide = function() {
            $scope.sideMenuController.toggleLeft();
        }
    });