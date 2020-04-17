app.service('userService', function ($http, $route) {
    let _userStateChangeCallbacks = []
    let _user = {}

    function updateUser(user) {
        _user = user
        console.log(_user);
        for (let callback of _userStateChangeCallbacks) {
            callback(_user)
        }
    }

    // register a function to be called when the user state change (for instance, the username is fetched from the server)
    this.onUserStateChange = function (callback) {
        console.log(callback)
        _userStateChangeCallbacks.push(callback)
        callback(_user)
    }

    // log out the user
    this.logout = function () {
        // Redirect the user to the logout page
        window.location = "/api/users/me/logout"
    }

    $http.get('/api/users/me')
        .then(function (resp) {
            updateUser(resp.data)
            // $route.reload()
        })
})
