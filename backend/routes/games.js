const express = require('express')
//const = {} = require('controller')

const router = express.Router()

//Get the home page
router.get('/', (req, res) => {
    //display home page with start button
    res.json({mssg: 'Home page'})
})

//Create/start a new game
router.post('/start', (req, res) => {
    //Shuffle deck + deal cards to player and dealer
    res.json({mssg: 'start  a game'})
})

//Update game to simulate player hit
router.post('/hit', (req, res) => {
    //Get specified game
    const {id} = req.params
    //check for valid id, assign a game constant(findById)
    //if game not found, return error
    //add new card to player's hand, update game status, update if player can hit again
    //return ok status with: updated player hand
    res.json({mssg: 'play out a hit'})
})

//Update game to simulate player stand
router.post('/stand', (req,res) => {
    //Get specified game
    const {id} = req.params
    //check for valid id, assign a game constant(findById)
    //if game not found, return error
    //play out dealer's turn, determine game winner
    //update game status, return both hands and the winner
    res.json({mssg: 'play out a stand'})
})

//Export the router
module.exports = router
