FG.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('main', {
      url: '',
      views: {
        '@': {
          templateUrl: 'app/main/main.html',
          // controller: 'MainCtrl'
        }
      },
      // resolve: {
      //   stocks: function(stockService) {
      //     return stockService.all();
      //   }
      // }
    })
    .state('main.portfolio', {
      url: '/portfolio',
      views: {
        'content@main': {
          templateUrl: 'app/portfolio/portfolio.html',
          // controller: 'MainCtrl'
        }
      },
    })
    .state('main.trade', {
      url: '/trade',
      views: {
        'content@main': {
          templateUrl: 'app/trade/trade.html'
        }
      }
    })
    .state('main.transactions', {
      url: '/transactions',
      views: {
        'content@main': {
          templateUrl: 'app/transactions/transactions.html'
        }
      }
    })

})
