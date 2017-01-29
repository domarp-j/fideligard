FG.factory('apiService',

  ['$http',

  function($http) {

    // Send API request to get stock data from Yahoo API
    // 'symbol' is the company symbol
    var getStockData = function(symbolsArray, startDate, endDate) {
      return $http.get(_buildQueryUrl(symbol, startDate, endDate))
        .then(function(response) {
          return response.data;
        })
    }

    // Send 'Yahoo Query Language' query to Yahoo API for historical stock data
    var _buildQueryUrl = function(symbolsArray, startDate, endDate) {
      for (var i = 0; i < symbolsArray.length; i++) {
        symbolsArray[i] = '"' + symbolsArray[i] + '"';
      }
      symbols = symbolsArray.join(',');
      return 'https://query.yahooapis.com/v1/public/yql?q=' +
        'select * from yahoo.finance.historicaldata ' +
        'where symbol in (' + symbols + ') ' +
        'and startDate = "' + startDate + '" ' +
        'and endDate = "' + endDate + '"' +
        '&format=json' +
        '&diagnostics=true' +
        '&env=store://datatables.org/alltableswithkeys' +
        '&callback=';
    }

    return {
      getStockData: getStockData,
      _buildQueryUrl: _buildQueryUrl // TODO: remove (temp)
    }

  }

])
