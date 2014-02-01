/**
 *  Drinks Controllers
 */
angular.module('lcboApp.controllers')
    .controller('DrinksIndexCtrl', ['$scope', '$rootScope', 'DrinksService', 'localStorageService', '$ionicLoading', '$timeout', 'LocationService',
        function($scope, $rootScope, DrinksService, localStorageService, $ionicLoading, $timeout, LocationService) {

        /**
         *  Reveals the filter panel
         *
         *  @method toggleSlide
         */
        $scope.toggleSlide = function() {
            $scope.sideMenuController.toggleLeft();
        }

        $scope.applyFilter = function(filter) {
            $scope.filters[filter] = true;
        }

        /**
         *  Performs the doSearch method, this function will be performed everytime
         *  the input 'query' is changed
         *
         *  @method search
         */
        $scope.search = function(query, page) {
            if (query && query.length > 0) {
                document.activeElement.blur();

                var filters = _.findKeys($scope.filters, true);

                $ionicLoading.show($rootScope.loadingConfig);

                DrinksService.getProducts(query, filters, page).success(function(response) {
                    console.log(response);
                    $scope.pager = response.pager;
                    $scope.results = response.result;
                    localStorageService.add('lastSearch', query);
                    localStorageService.add('lastResult', response.result);
                    $ionicLoading.show().hide();
                });
            }
        }

        /**
         *  Loads more results when the user hits the infinite scrolling location,
         *  will only perform the function if the length of results is > 20 and < 100
         *
         *  @method loadMore
         */
        $scope.loadMore = function() {
            console.log($scope.pager);
            if ($scope.results.length <= 100 && $scope.pager.total_record_count > 20) {
                $ionicLoading.show($rootScope.loadingConfig);

                DrinksService.loadMoreProducts($scope.pager.next_page_path).then(function(response) {
                    $scope.pager = response.data.pager;
                    $scope.results = $scope.results.concat(response.data.result);
                    $ionicLoading.show().hide();
                });
            }
        }

        /**
         *  Saves the product the user has selected to localStorage. This can
         *  then be retrieved in the detail view by reading from storage.
         *  Allows us to maintain deep links as well.
         *
         *  @method viewProduct
         *
         *  @param  {Object} item The product the user wishes to view
         */
        $scope.viewProduct = function(item) {
            localStorageService.add('lastProduct', item);
        }

        /**
         *  Controller initialize logic
         */
        $scope.init = function() {
            /**
             *  We force the application to create the localStorage entries in the application
             *  run configuration, if they are empty, they will default to an empty string
             *  and an empty array.
             */
            _.extend($scope, {
                results: localStorageService.get('lastResult'),
                request: localStorageService.get('lastSearch'),
                favorites: localStorageService.get('favoriteDrinks'),
                pager: {},
                stores: []
            });

            $scope.filters = {
                has_limited_time_offer: '',
                has_bonus_reward_miles: '',
                is_seasonal: '',
                is_vqa: '',
                is_kosher: ''
            }
        }

        $scope.init();
    }]);