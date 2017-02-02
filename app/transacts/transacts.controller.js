FG.controller('TransactsCtrl',

  ['$scope', 'transactsService',

  function($scope, transactsService) {

    // TODO: seed transactions (add method to transactsService)
    // TODO: add filter & sorting

    // Get transacts object
    var transacts = transactsService.getTransacts();
    $scope.transactions = transacts.list;

    // Watch for changes in transacts object & update transacts object
    $scope.$watch('transacts.changeTracker', function() {
      $scope.transactions = transacts.list;
    });

  }

])
