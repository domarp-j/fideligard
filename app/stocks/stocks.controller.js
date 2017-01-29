FG.controller('StocksCtrl',

  ['$scope', 'apiService',

  function($scope, apiService) {

    console.log(apiService._buildQueryUrl(['AAPL', 'CDR', 'DIS', 'EA', 'GOOGL', 'TSLA', 'UBI', 'VIV'], '2016-09-01', '2016-12-31'));

  }

])
