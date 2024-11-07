const express = require('express')
const {
    getHome,
    startGame,
    playHit,
    playStand
} = require('../controllers/gameController')

const router = express.Router()

//Get the home page
router.get('/', getHome)

//Create/start a new game
router.post('/start', startGame)

//Update game to simulate player hit
router.post('/hit', playHit)

//Update game to simulate player stand
router.post('/stand', playStand)

//Export the router
module.exports = router
