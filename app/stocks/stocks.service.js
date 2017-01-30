FG.factory('stocksService',

  ['$http', 'apiService', 'dateService',

  function($http, apiService, dateService) {

    // Initialize stockData
    // This will eventually be an array of data from the API call
    var _stockData = [];

    // List of companies to get stock values
    var _companies = [
      'AAPL',   // Apple
      'CDR',    // CD Projekt
      'DIS',    // Disney
      'EA',     // EA
      'GOOGL',  // Take a guess
      'TSLA',   // Tesla
      'UBI',    // Ubisoft
      'VIV'     // Vivendi
    ];

    // Get data using API
    var getStockData = function() {
      apiService.callAPI(
        _companies,
        dateService.dateDashFormat(dateService.getStartDate()),
        dateService.dateDashFormat(dateService.getEndDate())
      ).then(function(data) {
        angular.copy(data.query.results.quote, _stockData);
        return _stockData;
      })
    }

    // For development only - get data stored in /data/stocks.json
    var getStockDataTemp = function() {
      return $http.get('/data/stocks.json')
        .then(function(response) {
          angular.copy(response.data.query.results.quote, _stockData);
          return _stockData; 
        })
    }

    return {
      getStockData: getStockData,
      getStockDataTemp: getStockDataTemp
    }

  }

]);
