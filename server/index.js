const express = require(`express`);

const port = 42069;
const app = express();
const server = app.listen(port);

const io = require('socket.io')(server);
io.origins(`http://localhost:${port}`);
const maze = require('./src/maze');

app.use(express.static(`../public`));

let cells = maze.createMaze();

app.get(`/maze`, (req, res) => {

    res.send({
        cells
    })

});

let players = {};
//let currentSockets = [];

io.on('connection', socket => {
    //console.log(socket.id);
    socket.on('test', data => {
        console.log('recieved: ', data, 'from' + socket.id);
        socket.broadcast.emit('test', data);

    });
    socket.on('disconnect', () => {

        delete players[socket.id];
        socket.broadcast.emit('playerDis', socket.id);

    })
    socket.on('newPl', data => {
        //console.log('New  Player');
        //console.log(data);


        socket.emit('players', players);

        //console.log(players);

        players[socket.id] = {
            x: data.x,
            y: data.y,
            col: data.col,
            id: socket.id
        }

        let resp = {
            x: data.x,
            y: data.y,
            col: data.col,
            id: socket.id
        }

        socket.broadcast.emit('newPl', resp);

    })
    socket.on('pos', pos => {

        let data = {
            x: pos.x,
            y: pos.y,
            id: socket.id

        }
        socket.broadcast.emit('pos', data);
    });
    socket.on('shooting', data => {

        let resp = {
            x: data.x,
            y: data.y,
            id: socket.id

        }
        socket.broadcast.emit('shooting', resp);
    });
});

