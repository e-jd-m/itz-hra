const express = require(`express`); 

const app = express();
const server = app.listen(42069);

const io = require('socket.io')(server);

const maze = require('./src/maze');

/*/app.use(express.static(`../public`));
let cells = maze.createMaze();

let currentPlayers = [];

app.get(`/maze`, (req, res) => {

    res.send({
        cells
    })

});

let playerSetUp;

app.post('/setUp', (req, res) => {
    console.log(req);

    res.send('OK')

})

io.sockets.on('connection', socket => {
    socket.on(`newPl`, player => {

        let data={
            player,
            id: Math.random()
        }
        currentPlayers.push(data);
        socket.broadcast.emit(`newPl`, data);
    })
    socket.on('pos', data => {
        socket.broadcast.emit('pos', data);
    })
})

