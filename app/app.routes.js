FG.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('fideligard', {
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
    .state('fideligard.portfolio', {
      url: '/portfolio',
      views: {
        '@': {
          templateUrl: 'app/portfolio/portfolio.view.html',
          controller: 'PortfolioCtrl'
        }
      },
    })
    .state('fideligard.trade', {
      url: '/trade',
      views: {
        '@': {
          templateUrl: 'app/trade/trade.view.html',
          controller: 'TradeCtrl'
        }
      }
    })
    .state('fideligard.transactions', {
      url: '/transactions',
      views: {
        '@': {
          templateUrl: 'app/transactions/transactions.view.html',
          controller: 'TransactionsCtrl'
        }
      }
    })

})
