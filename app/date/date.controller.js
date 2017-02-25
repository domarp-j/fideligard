FG.controller('DateCtrl',

  ['$scope', 'dateService',

  function($scope, dateService) {

    var date = dateService.getDate();

    // Get the start and end dates for the stock simulator
    $scope.startDate = date.start;
    $scope.endDate = date.end;

    // Get days between the above start and end dates
    $scope.daysBetween = dateService.daysBetween(
      date.start,
      date.end
    );

    // Watch the date slider integer value (dayVal)
    // Based on the date slider, set the current date
    $scope.$watch('dayVal', function() {
      dateService.setCurrentDate($scope.dayVal);
      $scope.currentDate = date.current;
    });

  }

])
