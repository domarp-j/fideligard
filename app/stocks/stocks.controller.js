FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService',

  function($scope, stocksService, dateService) {

    $scope.stockData = {};

    stocksService.getStockDataTemp() // TODO: change to getStockData() for production
      .then(function(stockData) {
      })

  }

])
