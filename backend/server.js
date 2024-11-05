const express = require('express')
const app = express()
const gameRoutes = require('./routes/games.js')

//Middleware: will log any json properties that are written in a route
app.use(express.json());
app.use('/api/game', gameRoutes)
//Listener
app.listen(process.env.PORT, () => {
    console.log('Listening on port 5500!')
})
