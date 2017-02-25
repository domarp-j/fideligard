FG.controller('TransactsCtrl',

  ['$scope', 'transactsService',

  function($scope, transactsService) {

    // TODO: seed transactions (add method to transactsService)
    // TODO: add filter & sorting

    // Get transacts object
    $scope.transactions = transactsService.get().list;

    // Watch for changes in transacts object & update transacts object
    $scope.$watch('transacts.changeTracker', function() {
      $scope.transactions = transactsService.get().list;
    });

  }

])
