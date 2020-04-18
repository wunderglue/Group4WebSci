const mongoose = require('mongoose')

const practiceSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    results: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        value: {
            type: mongoose.Mixed,
            required: true
        },
        units: {
            type: String,
            required: false
        }
    }]
}, {
    timestamps: true
})


const Practice = mongoose.model('Practice', practiceSchema)

module.exports = Practice