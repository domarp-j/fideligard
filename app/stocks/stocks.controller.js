FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService',

  function($scope, stocksService, dateService) {

    var date = dateService.getDate();
    $scope.date = date;

    stocksService.populateStockDataTemp()
      .then(function() {
        var allStockData = stocksService.getStockData();

        $scope.$watch('date.currentDateWatched', function() {
          $scope.date = date;
          $scope.stockData = stocksService.arrayifyData(allStockData[date.currentDateWatched]);
        });

      });

  }

])
