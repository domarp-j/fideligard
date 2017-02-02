FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService', 'tradeService', 'portfolioService',

  function($scope, stocksService, dateService, tradeService, portfolioService) {

    // Get initial date
    var date = dateService.getDate();
    $scope.date = date;

    // Populate stockData in stocksService by communicating with API 
    // TODO: replace temporary version with API version
    stocksService.populateStockDataTemp()
      .then(function() {
        var allStockData = stocksService.getStockData();

        $scope.$watch('date.changeTracker', function() {
          $scope.date = date;
          $scope.stockData = stocksService.arrayifyData(allStockData[date.changeTracker]);
        });

      });

  }

])
