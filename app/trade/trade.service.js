FG.factory('tradeService',

  ['dateService',

  function(dateService) {

    // Trade object used to populate form
    var _trade = {
      company: "N/A",
      buySell: "buy",
      quantity: 1,
      date: dateService.get(),
      price: 0,
      cost: 0,
      changeTracker: "N/A"
    }

    // Get trade object
    var get = function() {
      return _trade;
    }

    // Update form when "trade" is clicked on stocks index or portfolio page
    // currentDate is the trade date as a string YYYY-MM-DD
    var update = function(currentDate, tradeParams) {
      _trade.company = tradeParams["company"] || _trade.company;
      _trade.buySell = tradeParams["buySell"] || _trade.buySell;
      _trade.quantity = tradeParams["quantity"] || 1;
      _trade.date = dateService.daysFrom(new Date(Date.parse(currentDate)), 1);
      _trade.price = tradeParams["price"] || _trade.price;
      _trade.cost = _trade.quantity * parseFloat(_trade.price);
      _trade.changeTracker = _trade.company + '-' + _trade.date;
    }

    return {
      get: get,
      update: update
    }

  }

])
