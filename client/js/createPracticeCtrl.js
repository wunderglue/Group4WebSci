app.controller('createPracticeCtrl', function($scope, $http, userService, leagueService) {

	$scope.pracItems = [];
	$scope.leagueName = ""

	$scope.addItem = function() {
		$scope.pracItems.push({
			name: "",
			desc: "",
			type: "",
			title: ""
		});
	}

	$scope.removeItem = function(itemIdx) {
	    console.log("Remove item")
		$scope.pracItems.splice(itemIdx, 1);
		console.log("Removed pracItem[" + itemIdx + "]");
	}

	$scope.relayInfo = function() {
        console.log($scope.pracItems);
        const questions = $scope.pracItems.map(q => ({
			name: q.name,
			description: q.desc,
			type: q.type
		}))

		const league = {
        	name: $scope.leagueName,
			coaches: [userService.getCurrentUser().rcs_id],
			members: [],
			questions: questions
		}

		$http.post('/api/leagues', league)
			.then(function(resp) {
				$scope.pracItems = []
				$scope.leagueName = ""
				leagueService.refresh()
			})
			.catch(function(resp) {
				alert(resp.data.message)
			})
    }

    // Create 1 question by default
	$scope.addItem()
});