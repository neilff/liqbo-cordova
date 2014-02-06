angular.module('lcboApp.controllers')
    .controller('AboutCtrl', ['$scope', '$rootScope', 'localStorageService',
        function($scope, $rootScope, localStorageService) {

        $scope.toggleToolTips = function() {
            $rootScope.showToolTips = !$rootScope.showToolTips;
            localStorageService.add('showToolTips', $rootScope.showToolTips);
            if ($rootScope.showToolTips) {
                $rootScope.toolTips = {
                    search: true,
                    product: true
                }
            }
        }

        /**
         *  Controller init logic
         */
        $scope.init = function() {
        }

        $scope.init();
    }]);