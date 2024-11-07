//Import gameModel and mongoose library
const Game = require('../models/GameModel.js')
const mongoose = require('mongoose')

//Get the Home page(GET)
const getHome = async (req, res) => {
    //ADD MORE? TRY-CATCH
    res.status(200).json({mssg:'HOME PAGE'})
}

//Create a new game(POST)
const startGame = async (req, res) => {
    //create deck
    //Shuffle deck
    //create new Game, with player, hand
    //wait for game to save to database
    //try catch: respond with good status & the Game
    res.status(200).json({mssg:'start game'})
}

//Player chooses to hit(POST)
const playHit = async (req, res) => {
    //fetch the game by its id(check for valid id)
    //add card to player's hand
    //if player gets blackjack, update the winner, end game
    //if player busts, update winner, end game
    res.status(200).json({mssg:'play out a hit'})
}

//Player chooses to stand(POST)
const playStand = async (req, res) => {
    //fetch the game by its id(check for valid id)
    //add cards to dealers hand until score < 17
    //if dealer gets blackjack, update the winner, end game
    //if player busts, update winner, end game
    //calculate + compare scores, set the winner
    //save game to database
    //respond with good status and the updated Game
    res.status(200).json({mssg:'play out a stand'})
}

//Helper to create a new deck of cards

//Helper to calculate the score of a player's hand

module.exports = {
    getHome,
    startGame,
    playHit,
    playStand
}
