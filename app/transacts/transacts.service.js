FG.factory('transactsService',

  [

  function() {

    // Collect all transactions in object
    var _transacts = {
      list: [],
      changeTracker: 0
    };

    // Get transacts
    var get = function() {
      return _transacts
    }

    // Add a transaction (from trade form)
    var add = function(transactParams) {
      _transacts.list.push(angular.copy(transactParams));
      _transacts.changeTracker++;
    }

    return {
      get: get,
      add: add
    }

  }

])
