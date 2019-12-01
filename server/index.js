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

let players = [];
//let currentSockets = [];

io.on('connection', socket => {
    //console.log(socket.id);
    socket.on('test', data => {
        console.log('recieved: ', data, 'from' + socket.id);
        socket.broadcast.emit('test', data);

    });
    socket.on('disconnect', () => {
        console.log('user has dis');
        let index = players.findIndex(element => element.id == socket.id);



        console.log(index);

        //currentSockets.splice(index, 1);
        players.splice(index, 1);
        socket.broadcast.emit('playerDis', index);

    })
    socket.on('newPl', data => {
        //console.log('New  Player');
        //console.log(data);
        if (!!players.length) {
            socket.emit('players', players);
        }

        players.push({
            x: data.x,
            y: data.y,
            col: data.col,
            id: socket.id
        })
        //currentSockets.push(socket);
        //console.log(Object.keys(players[0]));

        socket.broadcast.emit('newPl', data);

    })
    socket.on('pos', pos => {
        let index = players.findIndex(element => element.id == socket.id);
        let data = {
            x: pos.x,
            y: pos.y,
            index
        }
        socket.broadcast.emit('pos', data);
    });
    socket.on('shooting', data => {
        let index = players.findIndex(element => element.id == socket.id);
        let resp = {
            x: data.x,
            y: data.y,
            index
        }
        socket.broadcast.emit('shooting', resp);
    });
});

