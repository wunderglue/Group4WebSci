app.controller('meCtrl', function ($scope, userService) {
    userService.getMyStatistics().then(function (statistics) {
        $scope.$apply(function() {
            $scope.statistics = statistics
        })
    })
})
