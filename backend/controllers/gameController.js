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
        //Calculate scores
        newGame.player.score = calcScore(newGame.player)
        newGame.dealer.score = calcScore(newGame.dealer)
        //If player or dealer get blackjack
        if(newGame.player.score === 21){
            newGame.win = 'Player'
        }else if(newGame.dealer.score === 21){
            newGame.win = 'Dealer'
        }
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
    // Fetch the game by its id(Check for valid id)
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Error: no such game'})
    }
    const game = await Game.findById(id)

    game.player.hand.push(drawCard(game)) //draw a card
    game.player.score = calcScore(game.player)  //calculate player score

    // If player busts, update winner, end game
    if(game.player.score > 21){
        game.win = 'Dealer'
        await game.save()                    //save game to database
        this.gameEnd()
    }
    if(game.player.score === 21){
        // If player has blackjack, go to dealer's turn
        await game.save()                    //save game to database
        this.playStand()
    }
    
    res.status(200).json(game)
}

//Player chooses to stand(POST)
const playStand = async (req, res) => {
    // Fetch the game by its id(check for valid id)
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Error: no such game'})
    }
    const game = await Game.findById(id)

    // Add cards to dealers hand until score >= 17
    while(game.dealer.score < 17){
        game.dealer.hand.push(drawCard(game))       //draw a card
        game.dealer.score = calcScore(game.dealer)  //calculate player score
    }
    // If player & dealer have same score, its a tie
    if(game.player.score === game.dealer.score){
        game.win = 'tie'
        this.gameEnd()
    }
    // If dealer gets blackjack, update the winner, end game
    if(game.dealer.score === 21){
        game.win = 'Dealer'
        this.gameEnd()
    }
    // Else compare the scores
    if(game.player.score > game.dealer.score){
        game.win = 'Player'
    }else{
        game.win = 'Dealer'
    }
    this.gameEnd()

    //save game to database
    //respond with good status and the updated Game
    res.status(200).json({mssg:'play out a stand'})
}
//Helper to draw a card from a deck
function drawCard(game){
    return game.deck.pop()
}

//Display Game over(GET)
const gameEnd = async (req, res) => {
    // Fetch game by id
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Error: no such game'})
    }
    const game = await Game.findById(id)
    
    //display a game over, with the winner
    //handle a tie
    res.status(200).json({mssg:'end game'})
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
    playStand,
    gameEnd
}
