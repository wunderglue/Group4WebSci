app.controller('meCtrl', function($scope, $http, userService, leagueService) {
    leagueService.onLeagueChange( function (league) {
        if(userService.getCurrentUser() && leagueService.getCurrentLeague()) {
            $http.get(`/api/leagues/${leagueService.getCurrentLeague()._id}/statistics/${userService.getCurrentUser().rcs_id}`).then((resp) => {
                // console.log(leagueService.getCurrentLeague()._id)
                console.log(resp.data)
                for( i = 0; i < resp.data.length; i++){
                    // console.log(resp.data[i])
                    if(typeof(resp.data[i].max) != "number" || typeof(resp.data[i].min) != "number" || typeof(resp.data[i].average) != "number" ){
                        resp.data[i].max = null
                        resp.data[i].min = null
                        resp.data[i].average = null
                    }
                }
                $scope.statistics = resp.data
            })
        }
    })

    // leagueService.onLeagueChange(function(league){
    //     if(userService.getCurrentUser() && leagueService.getCurrentLeague()){
    //         $http.get(`/api/leagues/${leagueService.getCurrentLeague()._id}/statistics`).then((resp) => {
    //             console.log(resp.data)
    //             for( i = 0; i < resp.data.length; i++){
    //                 // console.log(resp.data[i])
    //                 if(typeof(resp.data[i].max) != "number" || typeof(resp.data[i].min) != "number" || typeof(resp.data[i].average) != "number" ){
    //                     resp.data[i].max = null
    //                     resp.data[i].min = null
    //                     resp.data[i].average = null
    //                 }
    //             }
    //             $scope.everybody = resp.data
    //         })
    //     }
    // })
});
