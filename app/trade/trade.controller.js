FG.controller('TradeCtrl',

  ['$scope', 'tradeService', 'dateService', 'stocksService', 'transactsService',

  function($scope, tradeService, dateService, stocksService, transactsService) {

    var trade = tradeService.getTrade();
    $scope.formData = trade;

    var date = dateService.getDate();
    $scope.date = date;

    var stocks = stocksService.getStockData();

    $scope.$watch('trade.changeTracker', function() {
      $scope.formData = trade; // TODO: bad to make these equal? angular.copy?
    });

    $scope.$watch('date.changeTracker', function() {
      if ($scope.formData.company !== 'N/A' && $scope.formData.buySell !== 'sell') {
        tradeService.updateTrade(date.changeTracker, {
          company: $scope.formData.company,
          buySell: $scope.formData.buySell,
          quantity: $scope.formData.quantity,
          price: stocks[date.changeTracker][$scope.formData.company]["price"]
        });
      }
    });

    $scope.$watch('formData.quantity', function(newQuantity) {
      $scope.formData.cost = $scope.formData.price * newQuantity;
    });

    $scope.processTradeRequest = function(formIsValid) {
      if (formIsValid) {
        transactsService.addTransact({
          date: $scope.formData.date,
          company: $scope.formData.company,
          buySell: $scope.formData.buySell,
          quantity: $scope.formData.quantity,
          price: $scope.formData.price
        })
      } 
    }

  }

])
