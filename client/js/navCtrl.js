app.controller('navCtrl', function ($scope, $route, $location, userService, leagueService) {
    $scope.appName = 'Sports App'
    $scope.username = ''
    $scope.current_league = null
    $scope.leagues = []
    let _leagues = []

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

    leagueService.onLeaguesListUpdate(function(leagues) {
        if(leagues.length !== 0 && !$scope.current_league) {
            console.log(leagues)
            leagueService.select(leagues[0])
        }
        $scope.leagues = leagues.map(l => l.name)
        _leagues = leagues
    })

    leagueService.onLeagueChange(function(league) {
        if(league) {
            $scope.current_league = league.name
        }
    })

    // Allow user to logout
    $scope.logout = function () {
        userService.logout()
    }

    $scope.changeLeague = function (name) {
        const league = _leagues.filter(l => l.name = name)[0]
        console.log(league);
        leagueService.select(league)
    }
})
