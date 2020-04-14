app.controller('meCtrl', function($scope, $http) {
    const username = "123456"
    $http.get(`/api/users/${username}/statistics`).then((resp) => {
        console.log(resp.data)
        $scope.statistics = resp.data
        // console.log(resp.data[0].keys)
        keys = (Object.keys(resp.data[0]))
        $scope.keys = keys
        // $scope.response = resp.data
        return resp.data
    }) 
});



// app.controller('meCtrl', function ($scope, userService) {
//     userService.getMyStatistics().then(function (statistics) {
//         console.log(statistics)
//         $scope.$apply(function() {
//             // console.log(statistics)
//             $scope.statistics = statistics
//             // console.log($scope.statistics)
//         })
//     })
// })
