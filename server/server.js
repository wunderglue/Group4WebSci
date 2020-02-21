const express = require('express')
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const CASAuthentication = require('cas-authentication')

const app = express()
app.use(session({
    secret: process.env.SESSION_SECRET || "development secret",
    resave: false,
    saveUninitialized : true
}))
app.use(cors())
app.use(express.static(path.join(__dirname, '../client')))
app.use(express.json())

const router = require('./routers/router')
app.use(router)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Running on port ${port}`))