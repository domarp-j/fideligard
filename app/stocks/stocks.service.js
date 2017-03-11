FG.factory('stocksService',

  ['$http', '_', 'apiService', 'dateService',

  function($http, _, apiService, dateService) {

    // Initialize stockData
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
    var _cleanData = function(apiData) {
      var newData = {};
      for (var i = 0; i < apiData.length; i++) {
        var date = apiData[i]["Date"];
        var company = apiData[i]["Symbol"];
        var value = apiData[i]["Close"];
        newData[date] = newData[date] || {};
        newData[date][company] = newData[date][company] || {};
        newData[date][company]["price"] = parseFloat(value);
      }
      return newData;
    }

    // A lot of dates are missing from stockData after the API call is made.
    // This method looks for dates that are missing and fills those values
    // with data from the day before.
    var _fillInGaps = function() {
      var begin = dateService.daysFrom(dateService.get().start, -30);
      var end = angular.copy(dateService.get().end);

      for (var d = begin; d <= end; d.setDate(d.getDate() + 1)) {
        var date = dateService.toString(d);
        var dayBefore = dateService.toString(dateService.daysFrom(d, -1));
        if (!_stockData[date]) _stockData[date] = {};
        for (var i = 0; i < _companies.length; i++) {
          _stockData[date][_companies[i]] = _stockData[date][_companies[i]] || {
            "price": _stockData[dayBefore][_companies[i]]["price"]
          };
        }
      }
    }

    // Adds difference in stock prices from 1d, 7d, and 30d ago
    var _addHistoricalData = function() {
      for (var date in _stockData) {
        // Convert date from YYYY-MM-DD strings to the actual Date object
        var dateObj = new Date(Date.parse(date));

        // Skip the first thirty days, since they won't have historical data
        if (dateObj < dateService.daysFrom(dateService.get().start, -1)) {
          continue;
        }

        // Get the required earlier dates (as Date objects)
        var oneDayBefore = dateService.daysFrom(dateObj, -1);
        var sevenDaysBefore = dateService.daysFrom(dateObj, -7);
        var thirtyDaysBefore = dateService.daysFrom(dateObj, -30);

        // Convert these dates from Date objects to YYYY-MM-DD strings
        oneDayBefore = dateService.toString(oneDayBefore);
        sevenDaysBefore = dateService.toString(sevenDaysBefore);
        thirtyDaysBefore = dateService.toString(thirtyDaysBefore);

        // Add historical data to each entry in _stockData
        for (var company in _stockData[date]) {
          _stockData[date][company]["1d"] = _stockData[date][company]["price"] - _stockData[oneDayBefore][company]["price"];
          _stockData[date][company]["7d"] = _stockData[date][company]["price"] - _stockData[sevenDaysBefore][company]["price"];
          _stockData[date][company]["30d"] = _stockData[date][company]["price"] - _stockData[thirtyDaysBefore][company]["price"];

          // console.log(_stockData[date][company]["1d"]);
          // console.log(_stockData[date][company]["7d"]);
          // console.log(_stockData[date][company]["30d"]);
        }
      }
    }

    // For production only - get data using API
    // TODO: use this in production
    var populateStockData = function() {
      var queryStartDate = dateService.daysFrom(date.startDate, -30);
      var queryEndDate = date.endDate;

      apiService.call(
        _companies,
        dateService.toString(queryStartDate),
        dateService.toString(queryEndDate)
      ).then(function(data) {
         angular.copy(_cleanData(data.query.results.quote), _stockData);
         _fillInGaps();
         _addHistoricalData()
         return _stockData;
       })
    }

    // For development & testing only - get data stored in /data/stocks.json
    var populateStockDataTemp = function() {
      return $http.get('/data/stocks.json')
        .then(function(response) {
          angular.copy(_cleanData(response.data.query.results.quote), _stockData);
          _fillInGaps();
          _addHistoricalData();
          return _stockData;
        })
    }

    // Get stock data
    var get = function() {
      return _stockData;
    }

    // Arrayify stock data for use in view
    var arrayifyData = function(data) {
      var dataArray = [];
      for (var company in data) {
        dataArray.push({
          "company": company,
          "price": data[company]["price"],
          "1d": data[company]["1d"],
          "7d": data[company]["7d"],
          "30d": data[company]["30d"]
        })
      }
      return dataArray;
    }

    // Check if company is in list of companies
    var checkCompany = function(company) {
      return _.includes(_companies, _.upperCase(company));
    }

    return {
      get: get,
      populateStockData: populateStockData,
      populateStockDataTemp: populateStockDataTemp,
      arrayifyData: arrayifyData,
      checkCompany: checkCompany
    }

  }

]);
