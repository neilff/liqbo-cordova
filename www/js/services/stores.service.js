/**
 *  Stores: Request Service
 */
angular.module('lcboApp.services')
    .factory('StoresService', ['$http', function($http) {

        $http.defaults.useXDomain = true;

        var getStores = function() {
            return $http({
                method: 'JSONP',
                url: 'http://lcboapi.com/stores.js',
                params: {
                    callback: 'JSON_CALLBACK'
                }
            });
        }

        return {
            getStores: getStores
        }
    }]);
