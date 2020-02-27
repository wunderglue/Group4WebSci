const mongoose = require('mongoose')

const practiceSchema = new mongoose.Schema({
    student: {
        // look into type, see if mongoose accepts objectID
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    practice_type:{
        type: String,
        required: true
    },
    results: [{
        exercise: {
            type: String,
            required: true
        },
        repitions: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    }] 
},{
    timestamps: true
})


const Practice = mongoose.model('Practice', practiceSchema)

module.exports = Practice