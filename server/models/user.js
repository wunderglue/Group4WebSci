const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    rcs_id: String
})

const User = mongoose.model('User', userSchema)
module.exports = User