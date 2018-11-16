// Source: https://www.consolelog.io/angularjs-change-path-without-reloading/
function noReload($location, $route, $rootScope, id) {
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
}
