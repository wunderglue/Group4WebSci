const express = require('express')
const router = express.Router()
const path = require('path')
var session = require('express-session');
var CASAuthentication = require('cas-authentication');
const CAS = require('koa2-cas')

const cas = new CAS({
  cas_url: 'https://cas-auth.rpi.edu/cas',
  service_url: 'https://cas-auth.rpi.edu',
  cas_version: '3.0',
  renew: false
})


router.get('/', (req, res) => {
    // res.send("Home Page")
    res.send(cas)
    return
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router