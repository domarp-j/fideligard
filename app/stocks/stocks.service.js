FG.factory('stocksService',

  ['$http', 'apiService', 'dateService',

  function($http, apiService, dateService) {

    // Initialize stockData
    // This will eventually be an array of data from the API call
    var _stockData = {};

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

    // Clean data so that it is in a more useful format
    // Input is array of objects, where each object has the following format:
    // {
    //   "Symbol": "AAPL",
    //   "Date": "2016-12-30",
    //   "Open": "116.650002",
    //   "High": "117.199997",
    //   "Low": "115.43",
    //   "Close": "115.82",
    //   "Volume": "30253100",
    //   "Adj_Close": "115.82"
    // }
    // Output should be an object of objects, where each object has the format:
    // {
    //   "2016-12-30": {
    //     "AAPL": {
    //       "Value": 115.82 // "Close"
    //     },
    //     ...
    //   }
    // }
    var _cleanData = function(data) {
      var newData = {};
      for (var i = 0; i < data.length; i++) {
        var date = data[i]["Date"];
        var company = data[i]["Symbol"];
        var value = data[i]["Close"];
        newData[date] = newData[date] || {};
        newData[date][company] = newData[date][company] || {};
        newData[date][company]["Value"] = parseInt(value);
      }
      return newData;
    }

    // For production only - get data using API
    var getStockData = function() {
      apiService.callAPI(
        _companies,
        dateService.dateDashFormat(dateService.getStartDate()),
        dateService.dateDashFormat(dateService.getEndDate())
      ).then(function(data) {
         angular.copy(_cleanData(data.query.results.quote), _stockData);
         return _stockData;
       })
    }

    // For development only - get data stored in /data/stocks.json
    var getStockDataTemp = function() {
      return $http.get('/data/stocks.json')
        .then(function(response) {
          angular.copy(_cleanData(response.data.query.results.quote), _stockData);
          return _stockData;
        })
    }

    return {
      getStockData: getStockData,
      getStockDataTemp: getStockDataTemp
    }

  }

]);
