FG.controller('DateCtrl',

  ['$scope', 'dateService',

  function($scope, dateService) {

    var date = dateService.getDate();

    // Get clean, presentable versions of startDate and endDate
    // startDate and endDate are in dateService
    $scope.startDate = date.startDate;
    $scope.endDate = date.endDate;

    // Get days between startDate and endDate
    $scope.daysBetween = dateService.daysBetween(
      date.startDate,
      date.endDate
    );

    // Get date from dayVal (set in view)
    $scope.$watch('dayVal', function() {
      dateService.setCurrentDate($scope.dayVal);
      $scope.currentDate = date.currentDate;
    });

  }

])
