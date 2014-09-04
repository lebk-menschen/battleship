angular.module('battleship', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/start");

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/tpl/login.html'
      })
      .state('start', {
        url: '/start',
        templateUrl: '/tpl/start.html'
      });

  }]);