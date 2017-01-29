FG.factory('apiService',

  ['$http',

  function($http) {

    // Send API request to get stock data from Yahoo API
    // 'symbol' is the company symbol
    // 'startDate' and 'endDate' are date strings in format YYYY-MM-DD
    var getStockData = function(symbol, startDate, endDate) {
      return $http.get(_buildQueryUrl(symbol, startDate, endDate))
        .then(function(response) {
          return response.data;
        })
    }

    // Send 'Yahoo Query Language' query to Yahoo API for historical stock data
    // 'symbol' is the company symbol
    // 'startDate' and 'endDate' are date strings in format YYYY-MM-DD
    var _buildQueryUrl = function(symbol, startDate, endDate) {
      return
        'http://query.yahooapis.com/v1/public/yql?q=' +
        'select * from yahoo.finance.historicaldata' +
        'where symbol = ' + symbol +
        'and startDate = ' + startDate +
        'and endDate = ' + endDate +
        '&format=json' +
        '&diagnostics=true' +
        '&env=store://datatables.org/alltableswithkeys' +
        '&callback='
    }

    return {
      getStockData: getStockData
    }

  }

])
