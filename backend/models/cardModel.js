const mongoose =  require('mongoose') //Importing the mongoose library
const Schema = mongoose.Schema; 

const cardSchema = new Schema({
    suit: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

//Export, checks if model already exists
module.exports = mongoose.models.cardModel || mongoose.model('cardModel', cardSchema)
