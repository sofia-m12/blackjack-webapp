const mongoose = require('mongoose')
const Schema = mongoose.Schema

const card = require('./cardModel')

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hand: {
        //The hand is multiple cards
        type: [card.schema],
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

//Export
module.exports = mongoose.model('playerModel', playerSchema)
