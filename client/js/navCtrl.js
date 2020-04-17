app.controller('navCtrl', function ($scope, $route, $location, userService) {
    $scope.appName = 'Sports App'
    $scope.username = ''

    // Generate navigation routes
    $scope.routes = []
    for (let route in $route.routes) {
        // Only canonical versions of routes
        if ($route.routes[route].includeInNav) {
            $scope.routes.push({
                path: route,
                name: $route.routes[route].name,
                active: $location.hash === '!' + route,
            })
        }
    }

    // Allow display of username
    userService.onUserStateChange(function (user) {
        $scope.username = user.rcs_id
    })

    // Allow user to logout
    $scope.logout = function () {
        userService.logout()
    }
})
