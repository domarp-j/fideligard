FG.controller('PortfolioCtrl',

  ['$scope', 'portfolioService', 'dateService', 'transactsService',

  function($scope, portfolioService, dateService, transactsService) {

    // Get date object
    var date = dateService.getDate();
    $scope.date = date;

    // Get portfolio items array 
    $scope.portfolioItems = portfolioService.getPortfolio().list;

    // Watch for changes in date & act accordingly
    $scope.$watch('date.changeTracker', function() {
      portfolioService.updatePortfolio(
        date.currentDate,
        transactsService.getTransacts().list
      );
      $scope.portfolioItems = portfolioService.getPortfolio().list;
    });

    // When 'Trade' is selected, populate trade form
    $scope.makeTrade = function($event) {
      // TODO: left off here
    }

  }

])
