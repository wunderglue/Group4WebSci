const mongoose = require('mongoose')

const practiceSchema = new mongoose.Schema({
    student: {
        // look into type, see if mongoose accepts objectID
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    league: {
        type: String,
        required: true
    },
    practice_type: {
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