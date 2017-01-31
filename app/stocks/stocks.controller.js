FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService', 'tradeService',

  function($scope, stocksService, dateService, tradeService) {

    var date = dateService.getDate();
    $scope.date = date;

    stocksService.populateStockDataTemp()
      .then(function() {
        var allStockData = stocksService.getStockData();

        $scope.$watch('date.changeTracker', function() {
          $scope.date = date;
          $scope.stockData = stocksService.arrayifyData(allStockData[date.changeTracker]);
        });

      });

    $scope.populateTradeForm = function($event) {
      var stockTableRow = angular.element($event.target).parent().parent();
      tradeService.updateTrade(stockTableRow, date.changeTracker);
    }

  }

])
