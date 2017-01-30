FG.controller('StocksCtrl',

  ['$scope', 'stocksService',

  function($scope, stocksService) {

    $scope.stockData = [];

    stocksService.getStockDataTemp() // TODO: change to getStockData() for production
      .then(function(stockData) {
        $scope.stockData = stockData;
      })

  }

])
