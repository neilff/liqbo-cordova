/**
 *  Application Filters
 */

angular.module('lcboApp.filters')

    /**
     *  Returns URI Endcoded string
     */
    .filter('escape', [function() {
        return function(string) {
            return string.toLowerCase().replace(/ /g, '+');
        };
    }])

    /**
     *  Converts cents to dollars
     */
    .filter('centsToDollars', [function() {
        return function(num) {
            return '$' + (num / 100).toFixed(2);
        };
    }])

    /**
     *  Converts LCBO APi alcohol to percentage
     */
    .filter('alcoholPercentage', [function() {
        return function(num) {
            return (num / 100).toFixed(1) + '%';
        };
    }]);