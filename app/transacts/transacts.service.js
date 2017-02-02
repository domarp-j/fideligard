FG.factory('transactsService',

  [

  function() {

    // Collect all transactions
    // Each object in transacts.list has the following scheme:
    // {
    //   date: Date object
    //   company: string,
    //   buySell: string,
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
      _transacts.list.push(angular.copy(transactParams)); 
      _transacts.changeTracker++;
    }

    return {
      getTransacts: getTransacts,
      addTransact: addTransact
    }

  }

])
