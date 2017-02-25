FG.controller('PortfolioCtrl',

  ['$scope', 'portfolioService', 'dateService', 'transactsService',

  function($scope, portfolioService, dateService, transactsService) {

    // Get date object
    $scope.date = dateService.get();

    // Get portfolio items array
    $scope.portfolioItems = portfolioService.get().list;

    // Watch for changes in date & act accordingly
    $scope.$watch('date.changeTracker', function() {
      portfolioService.update(
        $scope.date.current,
        transactsService.get().list
      );
      $scope.portfolioItems = portfolioService.get().list;
    });

  }

])
