FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService', 'tradeService', 'portfolioService',

  function($scope, stocksService, dateService, tradeService, portfolioService) {

    // Get date
    $scope.date = dateService.get();

    // Get entire stock data
    var stockData = stocksService.get();

    // Watch for changes in date
    // For given date, get specific stock data
    $scope.$watch('date.changeTracker', function() {
      $scope.currentData = stocksService.arrayifyData(stockData[$scope.date.changeTracker]);
    });

  }

])
