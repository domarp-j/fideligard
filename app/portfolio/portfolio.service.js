FG.factory('portfolioService',

  ['stocksService', 'dateService',

  function(stocksService, dateService) {

    // Note - this service depends on many other services
    // It should always be loaded last in index.html

    // Collect all portfolio items
    // Each object in portfolio.list has the following scheme:
    // {
    //   symbol: string,
    //   quantity: integer,
    //   costBasis: float,
    //   currentValue: float
    //   profitLoss: float,
    //   currentPrice: float
    //   1d: float,
    //   7d: float,
    //   30d: float
    // }
    var _portfolio = {
      cash: 1000,
      list: [],
      changeTracker: 0
    }

    // Get portfolio
    var getPortfolio = function() {
      return _portfolio;
    }

    // Populate portfolio with transactions data
    // 'transactions' is an array of objects from transactsService
    // 'date' (Date object) is used to determine which transactions to grab,
    //   since we only want transactions from the past
    var updatePortfolio = function(date, transactions) {

      // Do nothing if transactions list is empty
      if (transactions.length === 0) return;

      // Reset portfolio.list
      angular.copy([], _portfolio.list);

      // Get stock data
      var stockData = stocksService.getStockData(); // TODO: call every time?

      // Get date as string, for indexing
      var dateString = dateService.dateToString(dateService.getEarlierDate(date, 1));

      // Populate portfolio with above data
      for (var i = 0; i < transactions.length; i++) {

        // Only account for dates earlier than the current date
        if (transactions[i].date > date) continue;

        // Some useful parameters, stored as variables
        var symbol = transactions[i].company;
        var quantity = transactions[i].quantity;
        var costBasis = transactions[i].price * quantity;
        var currentPrice = stockData[dateString][symbol]["price"];
        var currentValue = currentPrice * quantity;
        var profitLoss = currentValue - costBasis;
        var oneDay = stockData[dateString][symbol]["1d"];
        var sevenDay = stockData[dateString][symbol]["7d"];
        var thirtyDay = stockData[dateString][symbol]["30d"];

        // Populate list
        _portfolio.list.push({
          "symbol": symbol,
          "quantity": quantity,
          "costBasis": costBasis,
          "currentValue": currentValue,
          "profitLoss": profitLoss,
          "currentPrice": currentPrice,
          "1d": oneDay,
          "7d": sevenDay,
          "30d": thirtyDay
        })

      }

    }

    return {
      getPortfolio: getPortfolio,
      updatePortfolio: updatePortfolio
    }

  }

])
