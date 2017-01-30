FG.controller('StocksCtrl',

  ['$scope', 'stocksService', 'dateService',

  function($scope, stocksService, dateService) {

    var date = dateService.getDate();

    $scope.stockData = stocksService.getStockDataTemp();

    $scope.$watch('date.currentDate', function() {
      // TODO: why is this broken???
    });

  }

])
