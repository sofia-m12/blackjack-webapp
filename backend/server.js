require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const gameRoutes = require('./routes/games.js')

//Middleware: will log any json properties that are written in a route
app.use(express.json());
app.use('/api/game', gameRoutes)

//Connect to MongoDB database/cluster!
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //Listener
    app.listen(process.env.PORT, () => {
    console.log('Connected to DB and Listening on port 5500!')
    })
})
.catch((error) => {
    console.log(error)
})

