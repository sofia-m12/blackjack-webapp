//Import gameModel and mongoose library
const Game = require('../models/GameModel.js')
const Card = require('../models/cardModel.js')
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
//Helper to draw a card from a deck
function drawCard(game){
    return game.deck.pop()
}

//Helper to create a new deck of cards
function createDeck() {
    //ranks and suits to be assigned
    const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    const suits = ['Spades','Clubs','Hearts','Diamonds'];
    
    const deck = []; //Initialize deck
    for (let x in ranks){
        for (let y in suits){
            const card = Card({
                suit: y,
                rank: x,
                value: x === 'A' ? 11 : //If rank is A, set value to 11
                isNaN(x) ? 10 :  //If rank if J, Q, K, set value to 10
                parseInt(x) //Else, set value to rank number
            })
            deck.push(card)   //Add card to the deck
        }
    }
    return deck
};

//Helper to calculate the score of a player's hand

module.exports = {
    getHome,
    startGame,
    playHit,
    playStand
}
