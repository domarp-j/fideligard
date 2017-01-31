FG.factory('portfolioService',

  [

  function() {

    var _cash = 1000;

    var getCash = function() {
      return _cash;
    }

    return {
      getCash: getCash
    }

  }

])
