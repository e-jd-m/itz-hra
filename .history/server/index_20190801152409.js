const express = require(`express`);

const app = express();
const server = app.listen(42069);

const io = require('socket.io')(server);

const maze = require('./src/maze');

app.use(express.static(`../public`));
let cells = maze.createMaze();

let currentPlayers = [];

app.get(`/maze`, (req, res) => {

    res.send({
        cells
    })

});

io.sockets.on('connection', socket => {
    socket.on(`newPl`, player => {

        let data={
            player,
            id: Math.random()
        }
        currentPlayers.push(data);
        socket.broadcast.emit(`newPl`, data);
        console.log(currentPlayers);
    })
    socket.on('pos', data => {
        socket.broadcast.emit('pos', data);
    })
})


/*
maze.cells[floor(random(0, maze.cells.length - 1))].i + maze.cells[floor(random(0,
        maze.cells.length - 1))].a / 2,
    maze.cells[floor(random(0, maze.cells.length - 1))].j + maze.cells[floor(random(0,
        maze.cells.length - 1))].a / 2, {
        r: random(0, 255),
        g: random(0, 255),
        b: random(0, 255)
    }
*/ 