FG.factory('transactsService',

  [

  function() {

    // Collect all transactions
    // Each object in transacts has the following scheme:
    // {
    //   date: date (as Date object)
    //   company: company name,
    //   buySell: buy or sell,
    //   quantity: integer,
    //   price: float
    // }
    var _transacts = {
      list: [],
      changeTracker: 0
    };

    // Get transacts
    var getTransacts = function() {
      return _transacts
    }

    // Add a transaction (from trade form)
    var addTransact = function(transactParams) {
      _transacts.list.push(angular.copy(transactParams)); // TODO: copy necessary?
      _transacts.changeTracker++;
      console.log(_transacts.changeTracker);
    }

    return {
      getTransacts: getTransacts,
      addTransact: addTransact
    }

  }

])
