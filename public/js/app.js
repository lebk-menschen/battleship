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
angular.module('battleship')
  .controller('MatchCtrl', ['$scope',
    function ($scope) {

      $scope.game = {
        fields: {
          player: {},
          opponent: {}
        }
      };

      $scope.columns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

      var getField = function () {
        var space = {
          isShip: false,
          isHit: false
        };

        var field = _.object(_.map($scope.rows, function (row) {
          var columns = _.object(_.map($scope.columns, function (column) {
            var copy = _.clone(space);

            copy.row = row;
            copy.col = column;

            return [column, copy];
          }));

          return [row, columns];
        }));

        return field;
      };

      var init = function () {
        $scope.game.fields.player = getField();
        $scope.game.fields.opponent = getField();
      };

      init();
    }
  ]);
angular.module('battleship')
  .directive('field', function () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: '/tpl/partials/field.html'
    };
  });
angular.module('battleship')
  .directive('fieldItem', function () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: '/tpl/partials/fieldItem.html',
      scope: {
        field: '=fieldData'
      }
    };
  });