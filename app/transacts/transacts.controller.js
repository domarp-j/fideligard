FG.controller('TransactsCtrl',

  ['$scope', 'transactsService',

  function($scope, transactsService) {

    // TODO: seed transactions (add method to transactsService)

    var transacts = transactsService.getTransacts();
    $scope.transactions = transacts.list;

    $scope.$watch('transacts.changeTracker', function() {
      $scope.transactions = transacts.list;
    });

  }

])
