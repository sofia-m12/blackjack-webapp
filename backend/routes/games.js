const express = require('express')
const {
    getHome,
    startGame,
    playHit,
    playStand,
    gameEnd
} = require('../controllers/gameController')

const router = express.Router()

//Get the home page
router.get('/', getHome)

//Create/start a new game
router.get('/start', startGame)

//Update game to simulate player hit
router.post('/hit/:id', playHit)

//Update game to simulate player stand
router.post('/stand/:id', playStand)

router.get('/end', gameEnd)
///:id

//Export the router
module.exports = router
