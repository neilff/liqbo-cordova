angular.module('lcboApp', ['ionic', 'lcboApp.services', 'lcboApp.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
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
                    controller: 'StoresIndexCtrl'
                }
            }
        })

        .state('tab.stores-detail', {
            url: '/stores/:storeId',
            views: {
                'stores-tab': {
                    templateUrl: 'templates/stores/detail.tpl.html',
                    controller: 'StoresDetailCtrl'
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

    $urlRouterProvider.otherwise('/tab/stores');
});

angular.module('lcboApp.services', []);
angular.module('lcboApp.controllers', []);