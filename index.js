const lozApp = angular.module('lozApp', ['ngRoute'])

lozApp.service('allGames', function($http) {
  this.getAllGames = () => $http.get('http://localhost:3000/games')
})

lozApp.controller('gameController', ['$scope', '$routeParams', '$http', '$location', '$route', '$rootScope', 'allGames',
function($scope, $routeParams, $http, $location, $route, $rootScope, allGames) {
  console.log($route, $rootScope)
  $scope.changeGame = (id) => {
    $scope.currentGame = $scope.allGames.find(game => game.id === id)

    // START - There is no native way in AngularJS to change URL without reload
    // Source: https://www.consolelog.io/angularjs-change-path-without-reloading/
    const original = $location.path
    $location.path = function (path, reload) {
        if (reload === false) {
            const lastRoute = $route.current
            const un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute
                un()
            })
        }
        return original.apply($location, [path])
    }
    $location.path(`/games/${id}`, false)
    $location.replace()
    // END - There is no native way in AngularJS to change URL without reload

  }
  allGames.getAllGames().then(data => {
    $scope.allGames = data.data
    $scope.currentGame = $scope.allGames.find(game => game.id === parseInt($routeParams.id))
  })
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
})
