FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService',

  function($scope, stocksService, dateService) {

    var date = dateService.getDate();
    var allStockData = stocksService.getStockData();

    $scope.$watch('date.currentDateWatched', function() {
      $scope.date = date;
      $scope.stockData = allStockData[date.currentDateWatched];
      console.log($scope.stockData);
    });

  }

])
