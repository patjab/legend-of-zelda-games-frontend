const lozApp = angular.module('lozApp', ['ngRoute'])

lozApp.service('games', function($http) {
  this.getAllGames = () => $http.get('http://localhost:3000/games')
})

lozApp.controller('gameController', ['$scope', '$routeParams', '$http', '$location', '$route', '$rootScope', 'games',
function($scope, $routeParams, $http, $location, $route, $rootScope, games) {
  $scope.changeGame = (id) => {
    $location.path(`games/${id}`)
  }
  games.getAllGames().then(data => {
    $scope.games = data.data
    $scope.currentGame = $scope.games.find(game => game.id === parseInt($routeParams.id))
  })
}])

lozApp.directive('gameCard', function() {
  return {
    restrict: 'AE',
    templateUrl: './customDir/gameCard.html',
    replace: true,
    scope: {
      gameObject: '=',
      yearsSinceRelease: '&',
      chooseGame: '&'
    },
    compile: function(el, at) {
      return {
        // pre: function(scope, elements, attributes){
        //   if (scope.gameObject.title === "Ocarina of Time") {
        //     attributes.class = ""
        //   }
        // },
        post: function(scope, elements, attributes) {
          if (scope.gameObject.title === "Ocarina of Time") {
            scope.gameObject.title = "MASTER SWORD"
          }
        }
      }
    }
  }
})

lozApp.controller('allGamesController', ['$scope', '$location', 'games', function($scope, $location, allGames) {
  $scope.chooseGame = (id) => $location.path(`games/${id}`)
  $scope.yearsSinceRelease = (releaseDate) => {
    return (new Date()).getFullYear() - parseInt(releaseDate.slice(-4))
  }

  allGames.getAllGames()
  .then(data => $scope.games = data.data)
}])

lozApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './templates/allGames.html',
    controller: 'allGamesController'
  })
  .when('/games/:id', {
    templateUrl: './templates/gameDetail.html',
    controller: 'gameController'
  })
})
