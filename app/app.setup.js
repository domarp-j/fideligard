var FG = angular.module('FG', ['ui.router']);

// Lodash
FG.factory('_', ['$window', function($window) {
  return $window._;
}]);
