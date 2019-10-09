const express = require(`express`);

const app = express();
const server = app.listen(42069);

const io = require('socket.io')(server);

const maze = require('./src/maze');

app.use(express.static(`../public`));
let cells = maze.createMaze();

app.get(`/maze`, (req, res) => {

    res.send({
        cells
    })

});

io.sockets.on('connection', socket => {
    socket.on(`newPl`, data => {
        socket.broadcast.emit(`newPl`)
    })
    socket.on('pos', data => {
        socket.broadcast.emit('pos', data);
    })
})