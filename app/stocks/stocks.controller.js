FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService',

  function($scope, stocksService, dateService) {

    $scope.stockData = {};

    // $scope.$watch('dateService.getCurrentDate()', function() {
    //   console.log('!');
    // });

  }

])
