app.controller('meCtrl', function($scope, $http, userService, leagueService) {
    leagueService.onLeagueChange( function (league) {
        if(userService.getCurrentUser() && leagueService.getCurrentLeague()) {
            $http.get(`/api/leagues/${leagueService.getCurrentLeague()._id}/statistics/${userService.getCurrentUser().rcs_id}`).then((resp) => {
                console.log(leagueService.getCurrentLeague()._id)
                $scope.statistics = resp.data
            })
        }
    })
});
