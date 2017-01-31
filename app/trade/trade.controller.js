FG.controller('TradeCtrl',

  ['$scope', 'tradeService', 'dateService', 'stocksService', 'transactsService',

  function($scope, tradeService, dateService, stocksService, transactsService) {

    var trade = tradeService.getTrade();
    $scope.formData = trade;

    var date = dateService.getDate();
    $scope.date = date;

    var stocks = stocksService.getStockData();

    $scope.$watch('trade.changeTracker', function() {
      $scope.formData = trade;
    });

    $scope.$watch('date.changeTracker', function() {
      if ($scope.formData.company !== 'N/A' && $scope.formData.buySell !== 'sell') {
        tradeService.updateTrade(date.changeTracker, {
          company: $scope.formData.company,
          buySell: "buy", // TODO: correct?
          quantity: $scope.formData.quantity,
          price: stocks[date.changeTracker][$scope.formData.company]["price"]
        });
      }
    });

    $scope.processTradeRequest = function(formIsValid) {
      if (formIsValid) {
        // transactsService.addTransact({
        //
        // })
      }
    }

  }

])
