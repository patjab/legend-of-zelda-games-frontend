const lozApp = angular.module('lozApp', ['ngRoute'])

lozApp.service('game', function() {
  this.setCurrentGame = gameObj => this.currentGame = gameObj
  this.getCurrentGame = () => this.currentGame
})

lozApp.controller('gameController', ['$scope', '$routeParams', '$http', 'game', function($scope, $routeParams, $http, game) {

  $http.get('http://localhost:3000/games')
  .then(data => data.data.find(game => game.id === parseInt($routeParams.id)))
  .then(gameObj => {
    game.setCurrentGame(gameObj)
    $scope.currentGame = game.getCurrentGame()
  })
}])

lozApp.controller('currentGameController', ['$scope', 'game', function($scope, game) {
  $scope.currentGame = game.getCurrentGame()
}])

lozApp.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    template: '<h3>Main page</h3>'
  })
  .when('/games/:id', {
    templateUrl: './templates/gameDetail.html',
    controller: 'gameController'
  })
  .when('/currentGame', {
    templateUrl: './templates/currentGame.html',
    controller: 'currentGameController'
  })

})
