const mongoose =  require('mongoose') //Importing the mongoose library
const Schema = mongoose.Schema; 

//Import cardModel and playerModel
const card = require('./cardModel')
const player = require('./playerModel.js')

const gameSchema = new Schema({
    player: {
        type: player.schema,
        required: true
    },
    dealer: {
        type: player.schema,
        required: true
    },
    deck: {
        //The deck is an array of cards
        type: [card.schema],
        required: true
    },
    win: {
        type: String,
        required: true
    }
})

//Export
module.exports = mongoose.model('gameModel', gameSchema)
