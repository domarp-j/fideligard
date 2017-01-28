FG.factory('stockService',

  ['apiService',

  function(apiService) {

    // Stock data parameters
    var _companies = ['AAPL'];
    var _startDate = '2016-06-01';
    var _endDate = '2016-12-31';

    // Stock data container
    var _stockData = {};

    // Call API for each company
    for (var i = 0; i < _companies.length; i++) {
      apiService.getStockData(_companies[i], _startDate, _endDate)
        .then(function(data) {
          _stockData[_companies[i]] = data;
        })
    }

  }

]);
