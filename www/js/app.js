angular.module('lcboApp', [
    'ionic',
    'lcboApp.services',
    'lcboApp.directives',
    'lcboApp.filters',
    'lcboApp.controllers',
    'google-maps',
    'LocalStorageModule'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        .state('tab.stores-index', {
            url: '/stores',
            views: {
                'stores-tab': {
                    templateUrl: 'templates/stores/index.tpl.html',
                    controller: 'StoresCtrl'
                }
            }
        })

        .state('tab.stores-detail', {
            url: '/stores/:storeId',
            views: {
                'stores-tab': {
                    templateUrl: 'templates/stores/detail.tpl.html',
                    controller: 'StoresCtrl'
                }
            }
        })

        .state('tab.drinks-index', {
            url: '/drinks',
            views: {
                'drinks-tab': {
                    templateUrl: 'templates/drinks/index.tpl.html',
                    controller: 'DrinksIndexCtrl'
                }
            }
        })

        .state('tab.drinks-detail', {
            url: '/drinks/:productId',
            views: {
                'drinks-tab': {
                    templateUrl: 'templates/drinks/detail.tpl.html',
                    controller: 'DrinksDetailCtrl'
                }
            }
        })

    $urlRouterProvider.otherwise('/tab/stores');
}])

/**
 *  Setup localstorage prefix
 */
.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('lcboApp');
}])

/**
 *  Establish localstorage on application run, if the entries don't exist, we need
 *  to create them. Load favorites into rootScope where we can carry them throughout
 *  the entire application on a global level
 */
.run(['localStorageService', '$rootScope', function(localStorageService, $rootScope) {
    if (!localStorageService.get('favoriteDrinks')) { localStorageService.add('favoriteDrinks', []) };
    if (!localStorageService.get('favoriteStores')) { localStorageService.add('favoriteStores', []) };
    if (!localStorageService.get('lastSearch')) { localStorageService.add('lastSearch', '') };
    if (!localStorageService.get('lastResult')) { localStorageService.add('lastResult', []) };

    /**
     *  Configure the Ionic loading modal
     */
    $rootScope.loadingConfig = {
        // The text to display in the loading indicator
        content: '<i class="icon ion-loading-c"></i> Loading',

        // The animation to use
        animation: 'fade-in',

        // Will a dark overlay or backdrop cover the entire view
        showBackdrop: true,

        // The maximum width of the loading indicator
        // Text will be wrapped if longer than maxWidth
        maxWidth: 200,

        // The delay in showing the indicator
        showDelay: 500
    }
}]);

/**
 *  Init Modules
 */
angular.module('lcboApp.directives', []);
angular.module('lcboApp.filters', []);
angular.module('lcboApp.services', []);
angular.module('lcboApp.controllers', []);

/**
 *  Underscore mixin for finding the keys where values are true
 */
_.mixin({
    findKeys: function(obj, search, context) {
        var result = [],
        isFunction = _.isFunction(search);

        _.each(obj, function (value, key) {
            var match = isFunction ? search.call(context, value, key, obj) : (value === search);
            if (match) {
                result.push(key);
            }
        });

    return result;
    }
});