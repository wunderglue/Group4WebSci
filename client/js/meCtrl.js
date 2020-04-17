app.controller('meCtrl', function($scope, $http, userService) {
    userService.onUserStateChange( function (user) {
        console.log("HERE!")
        const username = user.rcs_id
        $http.get(`/api/users/${username}/statistics`).then((resp) => {
            console.log(resp.data)
            $scope.statistics = resp.data
            // console.log(resp.data[0].keys)
            keys = (Object.keys(resp.data[0]))
            $scope.keys = keys
            // $scope.response = resp.data
            return resp.data
        })
    })
});
