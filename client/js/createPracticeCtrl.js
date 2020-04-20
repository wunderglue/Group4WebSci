app.controller('createPracticeCtrl', function($scope) {

	$scope.pracItems = [];

	$scope.addItem = function() {
		$scope.pracItems.push({
			name: "",
			desc: "",
			data: [{title: "", type: ""}],
		});
	}

	$scope.removeItem = function(itemIdx) {
		$scope.pracItems.splice(itemIdx, 1);
		console.log("Removed pracItem[" + itemIdx + "]");
	}

	$scope.addInputData = function(itemIdx) {
		$scope.pracItems[itemIdx].data.push({title: "", type: ""});
		console.log("Added input data to pracItem[" + itemIdx + "]");
	}

	$scope.removeInputData = function(item, dataIdx) {
		var i = $scope.pracItems.indexOf(item);
		$scope.pracItems[i].data.splice(dataIdx, 1);
	}

	$scope.relayInfo = function() {
        console.log($scope.pracItems);
    }
});