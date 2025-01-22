const express = require('express')
const {
    getHome,
    startGame,
    playHit,
    playStand,
    deleteGame
} = require('../controllers/gameController')

const router = express.Router()

//Get the home page
router.get('/', getHome)

//Create/start a new game(.get)
router.post('/start', startGame)

//Update game to simulate player hit(.post)
router.put('/hit/:id', playHit)

//Update game to simulate player stand(.post)
router.put('/stand/:id', playStand)

//Delete a game
router.delete('/deleteGame/:id', deleteGame)

//Export the router
module.exports = router
