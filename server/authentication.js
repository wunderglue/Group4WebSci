const CASAuthentication = require('cas-authentication')

const cas = new CASAuthentication({
    cas_url: process.env.CAS_URL || 'https://cas-auth.rpi.edu/cas',
    service_url: process.env.CAS_SERVICE_URL || "http://localhost:3000",
    cas_version: '3.0',
    renew: false
})

module.exports = {
    bounce: cas.bounce,
    block: cas.block,
    getUsername(req) {
        return req.session[cas.session_name]
    }
}