FG.controller('TradeCtrl',

  ['$scope', '$stateParams', 'tradeService', 'dateService', 'stocksService',
   'transactsService',

  function($scope, $stateParams, tradeService, dateService, stocksService,
           transactsService) {

    // Get trade object from tradeService
    var trade = tradeService.getTrade();
    $scope.formData = trade;

    // Get date object from dateService
    var date = dateService.getDate();
    $scope.date = date;

    // Get stock data from stocksService
    var stocks = stocksService.getStockData();

    // Watch for changes in trade form & act accordingly
    $scope.$watch('trade.changeTracker', function() {
      $scope.formData = trade;
    });

    // Watch for changes in date & act accordingly
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

    // Populate trade form after 'trade' is selected in stocks index or portfolio
    $scope.$watchGroup(
      ['$stateParams.company', '$stateParams.price', '$stateParams.buySell',
       '$stateParams.quantity'],
      function() {
        console.log('trade!');
        tradeService.updateTrade(date.changeTracker, {
          company: $stateParams.company,
          price: $stateParams.price,
          buySell: $stateParams.buySell,
          quantity: $stateParams.quantity
        });
      }
    );

    // Watch for changes in quanitity and update total cost
    $scope.$watch('formData.quantity', function(newQuantity) {
      $scope.formData.cost = $scope.formData.price * newQuantity;
    });

    // When a trade form is submitted, add to transactions
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
