app.service('userService', function ($http, $route) {
    let _userStateChangeCallbacks = []
    let _user = {}

    function updateUser(user) {
        _user = user
        for (let callback of _userStateChangeCallbacks) {
            callback(_user)
        }
    }

    // register a function to be called when the user state change (for instance, the username is fetched from the server)
    this.onUserStateChange = function (callback) {
        _userStateChangeCallbacks.push(callback)
        callback(_user)
    }

    // log out the user
    this.logout = function () {
        // Redirect the user to the logout page
        window.location = "/api/users/me/logout"
    }

    this.getMyStatistics = async function() {
        let exercise = ''
        let reps = ''
        let avgWeight =''
        await $http.get('/api/users/aggregateStats').then((resp) => {
            console.log(resp.data)
            exercise = resp.data.exercise
            reps = resp.data.repititions
            avgWeight = resp.data.averageWeight
            // return [
            //     // {name:'Exercise', value: resp.data.exercise, type: 'stringy', aggregate: 'string'},
            //     {name:'Repetitions', value: resp.data.repititions, type: 'count', aggregate: 'average'},
            //     {name:'Pounds Lifted', value: resp.data.averageWeight, type: 'quantity', unit: 'lbs', aggregate: 'last'},
            //     {name:'Tired?', value: 57, type: 'yes/no', aggregate: 'percent'}
            // ]
        })
        return [
            // {name:'Exercise', value: resp.data.exercise, type: 'stringy', aggregate: 'string'},
            {name:'Repetitions', value: reps, type: 'count', aggregate: 'average'},
            {name:'Pounds Lifted', value: avgWeight, type: 'quantity', unit: 'lbs', aggregate: 'last'},
            {name:'Tired?', value: 57, type: 'yes/no', aggregate: 'percent'}
        ]


        // return [
        //     {name:'Repetitions', value: 36, type: 'count', aggregate: 'average'},
        //     {name:'Pounds Lifted', value: 107, type: 'quantity', unit: 'lbs', aggregate: 'last'},
        //     {name:'Tired?', value: 57, type: 'yes/no', aggregate: 'percent'},
        // ]
    }

    $http.get('/api/users/me')
        .then(function (resp) {
            updateUser(resp.data)
            $route.reload()
        })
})
