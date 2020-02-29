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
        .when("/me/", {
            includeInNav: true,
            name: 'My Statistics',
            templateUrl: 'pages/me.html',
            controller: 'meCtrl',
        })
        .when("/questions/", {
            includeInNav: true,
            name: 'New Practice',
            templateUrl: 'pages/questions.html',
            controller: 'questionsCtrl',
        })
        .when("/page2/", {
            includeInNav: false,
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
    this.logout = function () {
        // Redirect the user to the logout page
        window.location = "/api/users/me/logout"
    }

    this.getMyStatistics = async function() {
        return [
            {name:'Repetitions', value: 36, type: 'count', aggregate: 'average'},
            {name:'Pounds Lifted', value: 107, type: 'quantity', unit: 'lbs', aggregate: 'last'},
            {name:'Tired?', value: 57, type: 'yes/no', aggregate: 'percent'},
        ]
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
    userService.onUserStateChange(function (user) {
        $scope.username = user.username
    })

    // Allow user to logout
    $scope.logout = function () {
        userService.logout()
    }
})

app.controller('homeCtrl', function ($scope) {
    $scope.message = 'hello'
})

app.controller('meCtrl', function ($scope, userService) {
    userService.getMyStatistics().then(function (statistics) {
        $scope.$apply(function() {
            $scope.statistics = statistics
        })
    })
})

app.controller('questionsCtrl', function ($scope) {

})