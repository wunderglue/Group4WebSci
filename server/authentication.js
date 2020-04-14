const CASAuthentication = require('cas-authentication')

// These default settings work well for development against RPI's CAS server
const cas = new CASAuthentication({
    cas_url: process.env.CAS_URL || 'https://cas-auth.rpi.edu/cas',
    service_url: process.env.CAS_SERVICE_URL || "http://localhost:3000",
    cas_version: '3.0',
    renew: false
})

// We re-export a subset of the API in case we want to modify function (i.e. for logging)
// module.exports = {
//     bounce: cas.bounce,
//     block: cas.block,
//     logout: cas.logout,
//     getUsername(req) {
//         return req.session[cas.session_name]
//     }
// }

module.exports = {
    bounce: (req, res, next) => next(),
    block: (req, res, next) => next(),
    logout: (req, res) => res.send("Logged Out!"),
    getUsername: (req) => "username"
}