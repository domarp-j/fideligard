FG.factory('tradeService',

  [

  function() {

    // Trade object used to populate form
    var _trade = {
      company: "",
      buySell: "BUY",
      quantity: 1,
      date: "",
      price: "",
      cost: "",
      changeTracker: ""
    }

    // Get trade object
    var getTrade = function() {
      return _trade;
    }

    // Update form when "trade" is clicked on stocks index
    // stockTableRow is a jQuery element
    // currentDate is the trade date as a string YYYY-MM-DD
    var updateTrade = function(stockTableRow, currentDate) {
      _trade.company = stockTableRow.children('.company')[0].innerHTML;
      _trade.buySell = "BUY";
      _trade.quantity = 1;
      _trade.date = currentDate;
      _trade.price = +(stockTableRow.children('.price')[0].innerHTML.substr(1));
      _trade.cost = _trade.quantity * _trade.price;
      _trade.changeTracker = _trade.company + '-' + _trade.date;
    }

    return {
      getTrade: getTrade,
      updateTrade: updateTrade
    }

  }

])
