const express = require('express')
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')

require('./database/database')
const app = express()
app.use(session({
    secret: process.env.SESSION_SECRET || "development secret",
    resave: false,
    saveUninitialized : true
}))
app.use(cors())
app.use(express.static(path.join(__dirname, '../client')))
app.use(express.json())

// Register all routes
const router = require('./routers/router')
const users = require('./routers/users')
const practices = require('./routers/practices')
const leagues = require('./routers/leagues')

app.use('/api/users', users)
app.use('/api/practices', practices)
app.use('/api/leagues', leagues)
app.use(router)     // The default router MUST be added last, otherwise it will eat all requests

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Running on port ${port}`))