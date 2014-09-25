angular.module('battleship', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', 
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/login");

      $stateProvider
        .state('start', {
          url: '/',
          templateUrl: '/tpl/start.html'
        })

        .state('login', {
          url: '/login',
          templateUrl: '/tpl/login.html'
        })

        .state('user', {
          abstract: true,
          url: '/user/:userId',
          templateUrl: '/tpl/views/user.html'
        })
          .state('user.matchList', {
            url: '/matches',
            templateUrl: '/tpl/views/matchList.html',
            controller: 'MatchListCtrl'
          })
          .state('user.match', {
            url: '/match/:matchId',
            templateUrl: '/tpl/views/match.html',
            controller: 'MatchCtrl'
          });
    }
  ])

  .run(['$rootScope', '$stateParams',
    function ($rootScope, $stateParams) {
      $rootScope.$on('$stateChangeSuccess', function () {
        console.log('state changed', $stateParams);

        $rootScope.stateParams = $stateParams;
      });
    }
  ])


  // Controllers
  .controller('UserCtrl', ['$scope',
    function ($scope) {

    }
  ])
  .controller('MatchListCtrl', ['$scope', 'MatchList',
    function ($scope, MatchList) {
      var numbers = _.range(10);

      var matches = _.map(numbers, function (matchId) {
        var ret = {
          name: 'Match Nr.' + (matchId + 1),
          opponent: 'Andreas',
          id: matchId,
          userTurn: (matchId % 3 === 0)
        };

        return ret;
      });

      $scope.matches = matches;
    }
  ])

  // Services
  .service('MatchList', ['$q',
    function ($q) {

      var spaeter = function() {
        var deferred = $q.defer();

        setTimeout(function () {
          deferred.resolve('bin fertig');
        }, 1000);

        return deferred.promise;
      };

      spaeter()
        .then(function (data) {
          console.log(data);
        });


    }
  ])

  ;