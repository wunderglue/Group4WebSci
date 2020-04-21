app.service('leagueService', function ($http, $route, userService) {
    let _listStateChangeCallbacks = []
    let _leagueChangeCallbacks = []
    let _leagues = []
    let _selectedLeague = null

    function updateList(leagues) {
        _leagues = leagues
        for (let callback of _listStateChangeCallbacks) {
            callback(_leagues)
        }
    }

    this.getCurrentLeague = function() {
        return _selectedLeague
    }

    // register a function to be called when the user state change (for instance, the username is fetched from the server)
    this.onLeaguesListUpdate = function (callback) {
        _listStateChangeCallbacks.push(callback)
        callback(_leagues)
    }

    this.onLeagueChange = function(callback) {
        _leagueChangeCallbacks.push(callback)
        callback(_selectedLeague)
    }

    this.select = function(league) {
        _selectedLeague = league
        for(let callback of _leagueChangeCallbacks) {
            callback(_selectedLeague)
        }
    }

    $http.get('/api/leagues')
        .then(function (resp) {
            // console.log(resp.data)
            updateList(resp.data)
            $route.reload()
        })
})
