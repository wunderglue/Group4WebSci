const app = angular.module('mainApp', ['ngRoute'])
app.config(function ($routeProvider) {
    // if `templateUrl` does not exist, client will hang
    $routeProvider
        .when("/", {
            includeInNav: true,
            name: 'Home',
            templateUrl: 'pages/home.html',
            controller: 'homeCtrl',
        })
        .when("/page2/", {
            includeInNav: true,
            name: 'Page 2',
            templateUrl: 'pages/page2.html',
        })
        .otherwise('/')
})

app.service('userService', function ($http, $route) {
    let _userStateChangeCallbacks = []
    let _user = {}

    function updateUser(user) {
        _user = user
        for (let callback of _userStateChangeCallbacks) {
            callback(_user)
        }
    }

    // register a function to be called when the user state change (for instance, the username is fetched from the server)
    this.onUserStateChange = function (callback) {
        _userStateChangeCallbacks.push(callback)
        callback(_user)
    }

    // log out the user
    this.logout = function() {
        // Redirect the user to the logout page
        window.location = "/api/users/me/logout"
    }

    $http.get('/api/users/me')
        .then(function (resp) {
            updateUser(resp.data)
            $route.reload()
        })
})

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
    userService.onUserStateChange(function(user) {
        $scope.username = user.username
    })

    // Allow user to logout
    $scope.logout = function() {
        userService.logout()
    }
})

app.controller('homeCtrl', function ($scope) {
    $scope.message = 'hello'
})