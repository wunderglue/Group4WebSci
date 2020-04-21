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
            includeInNav: true,
            coachOnly: true,
            name: 'Page 2',
            templateUrl: 'pages/page2.html',
        })
// <<<<<<< leagueTable
        .when("/league/", {
            includeInNav: true,
            coachOnly: true,
            name: "League Table",
            templateUrl: 'pages/league.html',
            controller: 'leagueCtrl',
        })
// =======
// >>>>>>> master
        .when("/createPractice/", {
            includeInNav: true,
            name: 'Create Practice',
            templateUrl: 'pages/createPractice.html',
            controller: 'createPracticeCtrl',
        })
        .otherwise('/')
})
