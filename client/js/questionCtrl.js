app.controller('questionsCtrl', function ($scope, $http, userService, leagueService) {
    $scope.responses = []


    leagueService.onLeagueChange(function (league) {
        $scope.questions = league.questions
    })

    $scope.submit = function() {
        console.log($scope.responses)

        const results = []
        for(const i in $scope.responses) {
            results.push({
                name: $scope.questions[i].name,
                type: $scope.questions[i].type,
                value: $scope.responses[i],
                units: $scope.questions[i].units
            })
        }

        const body = {
            student: userService.getCurrentUser().rcs_id,
            league: leagueService.getCurrentLeague()._id,
            results: results
        }

        $http.post('/api/practices', body).then(function() {
            console.log("Posted")
            $scope.responses = []
        })
    }


})
