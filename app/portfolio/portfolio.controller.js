FG.controller('PortfolioCtrl',

  ['$scope', 'portfolioService', 'dateService', 'transactsService',

  function($scope, portfolioService, dateService, transactsService) {

    var date = dateService.getDate();
    $scope.date = date;

    $scope.portfolioItems = portfolioService.getPortfolio().list;

    $scope.$watch('date.changeTracker', function() {
      portfolioService.updatePortfolio(
        date.currentDate,
        transactsService.getTransacts().list
      );
      $scope.portfolioItems = portfolioService.getPortfolio().list;
    });

    $scope.makeTrade = function($event) {
      // TODO: left off here
    }

  }

])
