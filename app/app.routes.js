FG.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('app', {
      url: '',
      views: {
        'date-widget@': {
          templateUrl: 'app/date/date.view.html',
          controller: 'DateCtrl'
        },
        'stocks-index@': {
          templateUrl: 'app/stocks/stocks.view.html',
          controller: 'StocksCtrl'
        }
      }
    })
    .state('app.portfolio', {
      url: '/portfolio',
      views: {
        'main-section@': {
          templateUrl: 'app/portfolio/portfolio.view.html',
          controller: 'PortfolioCtrl'
        }
      },
    })
    .state('app.trade', {
      url: '/trade',
      views: {
        'main-section@': {
          templateUrl: 'app/trade/trade.view.html',
          controller: 'TradeCtrl'
        }
      }
    })
    .state('app.transactions', {
      url: '/transactions',
      views: {
        'main-section@': {
          templateUrl: 'app/transactions/transactions.view.html',
          controller: 'TransactionsCtrl'
        }
      }
    })

})

// Debugging
FG.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
