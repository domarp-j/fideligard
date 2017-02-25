FG.factory('apiService',

  ['$http',

  function($http) {

    // Send API request to get stock data from Yahoo API
    // Returns the raw data from the API call
    var call = function(companies, startDate, endDate) {
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

    return {
      call: call
    }

  }

])
