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
      gameObject: '='
    }
  }
})

lozApp.controller('allGamesController', ['$scope', 'games', function($scope, allGames) {
  allGames.getAllGames()
  .then(data => $scope.games = data.data)
}])

lozApp.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    template: '<h3>Main page</h3>'
  })
  .when('/games', {
    templateUrl: './templates/allGames.html',
    controller: 'allGamesController'
  })
  .when('/games/:id', {
    templateUrl: './templates/gameDetail.html',
    controller: 'gameController'
  })
})
