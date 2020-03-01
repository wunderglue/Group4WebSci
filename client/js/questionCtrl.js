app.controller('questionsCtrl', function ($scope, questionsService) {
    $scope.responses = []
    questionsService.getPracticeTypes().then(types => {
        $scope.$apply(() => {
            $scope.practiceTypes = types
        })
    })

    $scope.selectType = function () {
        questionsService.getQuestionsByType($scope.selectedType).then(questions => {
            $scope.$apply(() => {
                $scope.questions = questions
            })
        })
    }

    $scope.submit = function() {
        console.log($scope.responses)
    }


})
