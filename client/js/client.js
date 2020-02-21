const app = angular.module('mainApp', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            includeInNav: true,
            name: 'Home',
            templateUrl: 'pages/home.html',
            controller: 'homeCtrl'
        })
        .when("/page2/", {
            includeInNav: true,
            name: 'Page 2',
            templateUrl: 'pages/page2.html'
        })
        .otherwise('/')
})

app.controller('navCtrl', function ($scope, $route, $location) {
    $scope.appName = 'Sports App';
    $scope.routes = []
    console.log($route.routes);
    for(let route in $route.routes) {
        // Only canonical versions of routes
        if($route.routes[route].includeInNav) {
            $scope.routes.push({
                path: route,
                name: $route.routes[route].name,
                active: $location.hash === '!' + route
            })
        }
    }
})

app.controller('homeCtrl', function($scope) {
    $scope.message = 'hello'
})