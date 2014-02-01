angular.module('lcboApp.controllers')
    .controller('DrinksDetailCtrl', ['$scope', 'DrinksService', 'localStorageService', '$stateParams', '$rootScope', '$ionicLoading', 'LocationService',
        function($scope, DrinksService, localStorageService, $stateParams, $rootScope, $ionicLoading, LocationService) {

        /**
         *  Check if the drink is stored in favorites
         *
         *  @method isFavorite
         *
         *  @param  {String} id Id of the product you wish to lookup
         *
         *  @return {Boolean}
         */
        var isFavorite = function(id) {
            return (_.findWhere(localStorageService.get('favoriteDrinks'), {id: parseInt(id)})) ? true : false;
        }

        /**
         *  Retrieves the product data from the API
         *
         *  @method getProductInfo
         *
         *  @param  {Integer} id Id of the product
         */
        var getProductInfo = function(id) {
            $ionicLoading.show($rootScope.loadingConfig);
            DrinksService.getProduct(id).success(function(data) {
                $scope.product = data.result;
                $ionicLoading.show().hide();
            });
        }

        /**
         *  Find the product local to the user, uses geolocation (device GPS) to find the
         *  users location, then finds stores closest to them via API
         *
         *  @method findLocally
         *
         *  @param  {Object} item The object you wish to find locally
         */
        $scope.findLocally = function(item) {
            $scope.noLocation = false;

            var locationSuccess = function(response) {
                console.log(response.coords);
                $ionicLoading.show($rootScope.loadingConfig);
                DrinksService.findLocally(item.id, response.coords).success(function(data) {
                    console.log(data);
                    $scope.stores = data.result;
                    $ionicLoading.show().hide();
                });
            }

            var locationError = function(response) {
                $scope.noLocation = true;
            }

            LocationService.getLocation().then(locationSuccess, locationError);
        }

        /**
         *  Add / Remove selected favorite to localstorage
         *
         *  @method toggleFavorite
         *
         *  @param  {Object} item The product you wish to add to the users favorites
         */
        $scope.toggleFavorite = function(product) {
            var item = { id: product.id, name: product.name },
                favorites = localStorageService.get('favoriteDrinks');

            if (_.findWhere(favorites, item)) {
                /* Remove Logic */
                favorites = _.reject(favorites, function(favorite) {
                    return favorite.id === item.id;
                });
            } else {
                /* Add Logic */
                favorites.push(item);
            }

            $scope.isFavorite = !$scope.isFavorite;
            return localStorageService.add('favoriteDrinks', favorites);
        }

        /**
         *  Controller initialize logic
         */
        $scope.init = function() {
            _.extend($scope, {
                product: {},
                isFavorite: isFavorite($stateParams.productId),
                noLocation: false
            });

            /* Retrieve product details -- either from localStorage or API */
            if (localStorageService.get('lastProduct').id === parseInt($stateParams.productId)) {
                $scope.product = localStorageService.get('lastProduct');
            } else {
                getProductInfo($stateParams.productId)
            }
        }

        $scope.init();
    }]);