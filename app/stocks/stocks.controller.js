FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService', 'tradeService', 'portfolioService',

  function($scope, stocksService, dateService, tradeService, portfolioService) {

    // Get date object
    $scope.date = dateService.get();

    // Get stock data object
    var stockData = stocksService.get();

    // Watch for changes in date & modify stock index as necessary
    $scope.$watch('date.changeTracker', function() {
      $scope.currentData = stocksService.arrayifyData(stockData[$scope.date.changeTracker]);
    });

  }

])
