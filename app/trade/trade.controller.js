FG.controller('TradeCtrl',

  ['$scope', '$stateParams', '$state', 'tradeService', 'dateService',
   'stocksService', 'transactsService', 'portfolioService',

  function($scope, $stateParams, $state, tradeService, dateService,
           stocksService, transactsService, portfolioService) {

    // Get trade object from tradeService
    var trade = tradeService.getTrade();
    $scope.formData = trade;

    // Get date object from dateService
    $scope.date = dateService.get();

    // Get stock data from stocksService
    var stocks = stocksService.getStockData();

    // Get available cash from portfolioService
    var cash = portfolioService.getPortfolio().cash;
    $scope.cash = cash;

    // Check if trade is valid
    $scope.validTrade = function() {
      var validDate = dateService.checkDate($scope.formData.date);
      var validCompany = stocksService.checkCompany($scope.formData.company);
      var validSell =
        $scope.formData.buySell === 'buy' ? true : portfolioService.checkSell(
          $scope.formData.company,
          $scope.formData.quantity
        );
      return validDate && validCompany && validSell;
    }

    // Set order status
    $scope.orderStatus = $scope.validTrade();

    // Watch for changes in trade form & act accordingly
    $scope.$watch('trade.changeTracker', function() {
      $scope.formData = trade;
    });

    // Watch for changes in date slide & act accordingly
    $scope.$watch('date.changeTracker', function() {
      if ($scope.formData.company !== 'N/A' && $scope.formData.buySell !== 'sell') {
        tradeService.updateTrade($scope.date.changeTracker, {
          company: $scope.formData.company,
          buySell: $scope.formData.buySell,
          quantity: $scope.formData.quantity,
          price: stocks[$scope.date.changeTracker][$scope.formData.company]["price"]
        });
      }
    });

    // Watch for changes in symbol entry & act accordingly
    $scope.$watch('formData.company', function() {
      $scope.orderStatus = $scope.validTrade();
      // TODO: change price with symbol change
    });

    // Populate trade form after 'trade' is selected in stocks index or portfolio
    $scope.$watchGroup(
      ['$stateParams.company', '$stateParams.price', '$stateParams.buySell',
       '$stateParams.quantity'],
      function() {
        tradeService.updateTrade($scope.date.changeTracker, {
          company: $stateParams.company,
          price: $stateParams.price,
          buySell: $stateParams.buySell,
          quantity: $stateParams.quantity
        });
        $scope.orderStatus = $scope.validTrade();
      }
    );

    // Watch for changes in quanitity and update total cost
    $scope.$watch('formData.quantity', function(newQuantity) {
      $scope.formData.cost = $scope.formData.price * newQuantity;
      $scope.orderStatus = $scope.validTrade();
    });

    // Handle a trade request
    $scope.processTradeRequest = function(formIsValid) {

      if ($scope.validTrade() && formIsValid) {

        transactsService.addTransact({
          date: $scope.formData.date,
          company: $scope.formData.company,
          buySell: $scope.formData.buySell,
          quantity: $scope.formData.quantity,
          price: $scope.formData.price
        })
        $state.go("app.portfolio");

      }

    }

  }

])
