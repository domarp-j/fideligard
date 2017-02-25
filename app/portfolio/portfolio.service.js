FG.factory('portfolioService',

  ['_', 'stocksService', 'dateService',

  function(_, stocksService, dateService) {

    // Note - this service depends on many other services
    // It should always be loaded last in index.html

    // Collect all portfolio items
    var _portfolio = {
      cash: 1000,
      list: [],
      changeTracker: 0
    }

    // Hold onto copy of stockData for updating portfolio
    var stockData = stocksService.get();

    // Get portfolio
    var get = function() {
      return _portfolio;
    }

    // Populate portfolio with transactions data
    var update = function(date, transactions) {
      if (!transactions.length) return;

      // Reset portfolio.list
      angular.copy([], _portfolio.list);

      // Get date as string, for indexing
      var date = dateService.toString(dateService.daysFrom(date, -1));

      for (var i = 0; i < transactions.length; i++) {

        // Only account for dates earlier than the current date
        if (transactions[i].date > date) continue;

        if (transactions[i].buySell === 'buy') {
          _buyStock(stockData, date, transactions[i]);
        } else {
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
      get: get,
      update: update,
      checkSell: checkSell
    }

  }

])
