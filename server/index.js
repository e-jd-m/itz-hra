const express = require(`express`);

const app = express();
const server = app.listen(42069);

const io = require('socket.io')(server);
io.origins('http://localhost:42069');
const maze = require('./src/maze');

app.use(express.static(`../public`));

let cells = maze.createMaze();

app.get(`/maze`, (req, res) => {

    res.send({
        cells
    })

});

let players = [];
let currentSockets = [];

io.on('connection', socket => {
    //console.log(socket.id);
    socket.on('test', data => {
        console.log('recieved: ', data, 'from' + socket.id);
        socket.broadcast.emit('test', data);

    });
    socket.on('disconnect', () => {
        console.log('user has dis');
        let index = currentSockets.indexOf(socket);


        /*for (let i = 0; i < players.length; i++) {
            if (players[i].id == socket.id) {
                index = i;
            }
        }*/
        console.log(index);
        /*let index = findIndex(socket.id, players);
        console.log(index);*/
        currentSockets.splice(index, 1);
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
        currentSockets.push(socket);

        socket.broadcast.emit('newPl', data);

    })
    socket.on('pos', pos => {
        let index = currentSockets.indexOf(socket);
        let data = {
            x: pos.x,
            y: pos.y,
            index
        }
        socket.broadcast.emit('pos', data);
    });
});



function findIndex(sId, players) {
    let index;
    for (let i = 0; i < players.length; i++) {
        if (players[i].id == sId) {
            return index;

        }
    }
}