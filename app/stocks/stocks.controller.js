FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService', 'tradeService', 'portfolioService',

  function($scope, stocksService, dateService, tradeService, portfolioService) {

    // Get ate object
    var date = dateService.getDate();
    $scope.date = date;

    // Get stock data object
    var allStockData = stocksService.getStockData();

    // Watch for changes in date & modify stock index as necessary
    $scope.$watch('date.changeTracker', function() {
      $scope.date = date;
      $scope.stockData = stocksService.arrayifyData(allStockData[date.changeTracker]);
    });

  }

])
