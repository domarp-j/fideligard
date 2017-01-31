FG.controller('TradeCtrl',

  ['$scope', 'tradeService',

  function($scope, tradeService) {

    var trade = tradeService.getTrade();
    $scope.trade = trade;

    $scope.$watch('trade.changeTracker', function() {
      
    });

  }

])
