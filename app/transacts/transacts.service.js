FG.factory('transactsService',

  [

  function() {

    var _transacts = [];

    var addTransact = function(transactParams) {
      // _transacts.push({
      //   date: transactParams.date,
      //   company: transactParams.company,
      //   buySell: transactParams.buySell,
      //
      // })
    }

    return {
      addTransact: addTransact
    }

  }

])
