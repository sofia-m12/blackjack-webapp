//Import gameModel, cardModel and mongoose library
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
    try{
        //Create a shuffled deck
        let newDeck = shuffle(createDeck())
        //Create new Game, with player, hand
        let newGame = new Game({
            player: {name: 'player',hand: [], score: 0},
            dealer: {name: 'dealer',hand: [], score: 0},
            deck: newDeck
        })
        //Deal hands to both players
        newGame.player.hand.push(drawCard(newGame))
        newGame.dealer.hand.push(drawCard(newGame))
        newGame.player.hand.push(drawCard(newGame))
        newGame.dealer.hand.push(drawCard(newGame))
        //wait for game to save to database
        await newGame.save()
        res.status(200).json({game: newGame, gameId: newGame._id})
    }catch (error){
        console.error(error)
        res.status(400).json({mssg: 'Error: game not started'})
    }
}

//Player chooses to hit(POST)
const playHit = async (req, res) => {
    //fetch the game by its id(check for valid id)
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Error: no such game'})
    }
    const game = await Game.findById(id)
    game.player.score = calcScore(game.player)//testing calcScore
    //add card to player's hand,calculate score

    //if player gets blackjack, update the winner, end game
    //if player busts, update winner, end game
    res.status(200).json(game)
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
                suit: suits[y],
                rank: ranks[x],
                value: ranks[x] === 'A' ? 11 : //If rank is A, set value to 11
                isNaN(ranks[x]) ? 10 :  //If rank if J, Q, K, set value to 10
                parseInt(ranks[x]) //Else, set value to rank number
            })
            deck.push(card)   //Add card to the deck
        }
    }
    return deck
};

//Helper to shuffle a deck of cards, Fisher-yates algorithm
function shuffle(deck) {
    let temp
    for(let i = deck.length - 1;i > 0;i--){
        temp = Math.floor(Math.random() * (i+1))
        [deck[i], deck[temp]] = [deck[temp], deck[i]]
    }
    return deck
}

//Helper to calculate the score of a player's hand
function calcScore(player) {
    //Add up values of the player's hand
    let score = 0
    let hasAce = false
    for(x of player.hand){
        if(x.rank === 'A'){
            hasAce = true
        }
        score += x.value
    }
    //If Ace puts player over 21, change to value of 1
    if(hasAce && score > 21){
        score -= 10
    }
    return score
}

module.exports = {
    getHome,
    startGame,
    playHit,
    playStand
}
