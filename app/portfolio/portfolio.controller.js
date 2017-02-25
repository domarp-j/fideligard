FG.controller('PortfolioCtrl',

  ['$scope', 'portfolioService', 'dateService', 'transactsService',

  function($scope, portfolioService, dateService, transactsService) {

    // Get date object
    $scope.date = dateService.getDate();

    // Get portfolio items array
    $scope.portfolioItems = portfolioService.getPortfolio().list;

    // Watch for changes in date & act accordingly
    $scope.$watch('date.changeTracker', function() {
      portfolioService.updatePortfolio(
        $scope.date.current,
        transactsService.getTransacts().list
      );
      $scope.portfolioItems = portfolioService.getPortfolio().list;
    });

  }

])
