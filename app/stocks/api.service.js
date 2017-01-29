FG.factory('apiService',

  ['$http',

  function($http) {

    // Send API request to get stock data from Yahoo API
    // 'symbol' is the company symbol
    var getStockData = function(companies, startDate, endDate) {
      return $http.get(_buildQueryUrl(companies, startDate, endDate))
        .then(function(response) {
          return response.data;
        })
    }

    // Send 'Yahoo Query Language' query to Yahoo API for historical stock data
    var _buildQueryUrl = function(companies, startDate, endDate) {
      for (var i = 0; i < companies.length; i++) {
        companies[i] = '"' + companies[i] + '"';
      }
      companiesList = companies.join(',');
      return 'https://query.yahooapis.com/v1/public/yql?q=' +
        'select * from yahoo.finance.historicaldata ' +
        'where symbol in (' + companiesList + ') ' +
        'and startDate = "' + startDate + '" ' +
        'and endDate = "' + endDate + '"' +
        '&format=json' +
        '&diagnostics=true' +
        '&env=store://datatables.org/alltableswithkeys' +
        '&callback=';
    }

    // If data is stored in /data/stocks.json, this method gets that data
    var getStockDataStored = function() {
      return $http.get('/data/stocks.json')
        .then(function(response) {
          return response.data;
        })
    }

    return {
      getStockData: getStockData,
      getStockDataStored: getStockDataStored,
      _buildQueryUrl: _buildQueryUrl
    }

  }

])
