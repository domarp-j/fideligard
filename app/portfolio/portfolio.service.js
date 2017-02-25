FG.factory('portfolioService',

  ['_', 'stocksService', 'dateService',

  function(_, stocksService, dateService) {

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

    // Hold onto copy of stockData for updating portfolio
    var stockData = stocksService.getStockData();

    // Populate portfolio with transactions data
    // transactions is an array of objects from transactsService
    // date (Date object) is used to determine past transactions to grab
    var updatePortfolio = function(date, transactions) {

      // Do nothing if transactions list is empty
      if (!transactions.length) return;

      // Reset portfolio.list
      angular.copy([], _portfolio.list);

      // Get date as string, for indexing
      var date = dateService.toString(dateService.daysFrom(date, -1));

      // Populate portfolio with above data
      for (var i = 0; i < transactions.length; i++) {

        // Only account for dates earlier than the current date
        if (transactions[i].date > date) continue;

        // Handling 'buy' transactions
        if (transactions[i].buySell === 'buy') {
          _buyStock(stockData, date, transactions[i]);
        } else { // Handling 'sell' transactions
          // _sellStock(stockParams);
        }

      }

    }

    // Update portolio with 'buy' transacts
    var _buyStock = function(stockData, date, transact) {

      symbol = transact.company;
      quantity = transact.quantity;
      costBasis = transact.price * quantity;
      currentPrice = stockData[date][symbol]["price"];
      currentValue = currentPrice * quantity;
      profitLoss = currentValue - costBasis;
      oneDay = stockData[date][symbol]["1d"];
      sevenDay = stockData[date][symbol]["7d"];
      thirtyDay = stockData[date][symbol]["30d"];

      // Populate portfolio list
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

    // Update portfoio with 'sell' transacts'
    // var _sellStock = function(stockParams) {
    //
    // }

    // Check if a sale is possible based on portfolio data
    var checkSell = function(company, quantity) {
      for (var i = 0; i < _portfolio.list.length; i++) {
        var ownsCompanyStock = _portfolio.list[i]["symbol"] === company;
        var ownsCorrectQuantity = _portfolio.list[i]["quantity"];
        if (ownsCompanyStock && ownsCorrectQuantity) {
          return true;
        }
      }
      return false;
    }

    return {
      getPortfolio: getPortfolio,
      updatePortfolio: updatePortfolio,
      checkSell: checkSell
    }

  }

])
