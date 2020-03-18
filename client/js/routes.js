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