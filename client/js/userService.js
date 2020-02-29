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
        return [
            {name:'Repetitions', value: 36, type: 'count', aggregate: 'average'},
            {name:'Pounds Lifted', value: 107, type: 'quantity', unit: 'lbs', aggregate: 'last'},
            {name:'Tired?', value: 57, type: 'yes/no', aggregate: 'percent'},
        ]
    }

    $http.get('/api/users/me')
        .then(function (resp) {
            updateUser(resp.data)
            $route.reload()
        })
})
