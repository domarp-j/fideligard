FG.controller('TradeCtrl',

  ['$scope', 'tradeService', 'dateService', 'stocksService',

  function($scope, tradeService, dateService, stocksService) {

    var trade = tradeService.getTrade();
    $scope.formData = trade;

    var date = dateService.getDate();
    $scope.date = date;

    var stocks = stocksService.getStockData();

    $scope.$watch('trade.changeTracker', function() {
      $scope.formData = trade;
    });

    $scope.$watch('date.changeTracker', function() {
      if ($scope.formData.company !== 'N/A') {
        tradeService.updateTrade(date.changeTracker, {
          company: $scope.formData.company,
          buySell: "buy", // TODO: correct?
          quantity: $scope.formData.quantity,
          price: stocks[date.changeTracker][$scope.formData.company]["price"]
        });
      }
    });

  }

])
