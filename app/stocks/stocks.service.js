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
    //       "Price": 115.82 // "Close"
    //     },
    //     ...
    //   }
    // }
    var _cleanData = function(apiData) {
      var newData = {};
      for (var i = 0; i < apiData.length; i++) {
        var date = apiData[i]["Date"];
        var company = apiData[i]["Symbol"];
        var value = apiData[i]["Close"];
        newData[date] = newData[date] || {};
        newData[date][company] = newData[date][company] || {};
        newData[date][company]["Price"] = parseInt(value);
      }
      return newData;
    }

    // A lot of dates are missing from stockData after the API call is made
    // This method looks for dates that are missing and fills those values
    //   blank dummy data.
    // This method should only be called after cleanData is called!
    var _fillInGaps = function() {
      // Iterate from begin to end (both Date objects)
      var begin = dateService.getEarlierDate(dateService.getStartDate(), 30);
      var end = angular.copy(dateService.getEndDate());
      for (var d = begin; d <= end; d.setDate(d.getDate() + 1)) {
        // Check if date does not exist in _stockData
        // If not, fill it in with dummy data
        var date = dateService.dateDashFormat(d)
        if (!_stockData[date]) {
          _stockData[date] = {};
          for (var i = 0; i < _companies.length; i++) {
            _stockData[date][_companies[i]] = {
              "Price": 0
            }
          }
        }
      }
    }

    // Adds stock prices from 1d, 7d, and 30d ago to data
    // Input should be the same as the output in cleanData
    // Output should be that same object with 1d, 7d, 30d data added
    // {
    //   "2016-12-30": {
    //     "AAPL": {
    //       "Value": 115.82, // "Close"
    //       "1d": ???,
    //       "7d": ???,
    //       "30d": ???
    //   },
    //   ...
    // }
    // This method should only be called after fillInGaps is called!
    var _addHistoricalData = function() {
      for (var date in _stockData) {
        // Convert date from YYYY-MM-DD to Date object
        var dateAsObj = new Date(Date.parse(date));
        // Get past dates as Date objects
        var oneDayBefore = dateService.getEarlierDate(dateAsObj, 1);
        var sevenDaysBefore = dateService.getEarlierDate(dateAsObj, 7);
        var thirtyDaysBefore = dateService.getEarlierDate(dateAsObj, 30);
      }
    }



    // For production only - get data using API
    // Note that we actually want to set the start date as thirty days before
    //   the startDate set in dateService
    // That way, we can get historical data from 30 days ago for the very
    //   first day
    var getStockData = function() {
      var queryStartDate = dateService.getEarlierDate(dateService.getStartDate(), 30);
      var queryEndDate = dateService.getEndDate();

      apiService.callAPI(
        _companies,
        dateService.dateDashFormat(queryStartDate),
        dateService.dateDashFormat(queryEndDate)
      ).then(function(data) {
         angular.copy(_cleanData(data.query.results.quote), _stockData);
         _fillInGaps();
        //  _addHistoricalData();
         return _stockData;
       })
    }

    // For development only - get data stored in /data/stocks.json
    var getStockDataTemp = function() {
      return $http.get('/data/stocks.json')
        .then(function(response) {
          angular.copy(_cleanData(response.data.query.results.quote), _stockData);
          _fillInGaps();
          // _addHistoricalData();
          return _stockData;
        })
    }

    return {
      getStockData: getStockData,
      getStockDataTemp: getStockDataTemp
    }

  }

]);
