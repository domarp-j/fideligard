FG.controller('DateCtrl',

  ['$scope', 'dateService',

  function($scope, dateService) {

    // Get clean, presentable versions of startDate and endDate
    // startDate and endDate are in dateService
    $scope.startDate = dateService.cleanDate(dateService.getStartDate());
    $scope.endDate = dateService.cleanDate(dateService.getEndDate());

    // Get days between startDate and endDate
    $scope.daysBetween = dateService.daysBetween();


    // Get date from dayVal (set in view)
    $scope.$watch('dayVal', function() {
      $scope.currentDate = dateService.cleanDate(dateService.setCurrentDate($scope.dayVal));
      $scope.temp = dateService.getCurrentDate(); 
    });
  }

])
