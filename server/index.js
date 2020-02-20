
//ziskani portu pri spusteni
const args = process.argv.slice(2);
const portArg = +args[0];
let port = process.env.PORT || 3000;

if (portArg) {
    port = process.env.PORT || portArg;
}

const express = require(`express`);


//vyvoreni serveru
const app = express();
const server = app.listen(port, () => console.log(`listenig at ${port}`));

const io = require('socket.io')(server);
const maze = require('./src/maze');

//hostovani statickehe slozky public
app.use(express.static(`../public`));

//vygenerovani bludiste
let cells = maze.createMaze();

//pokud prijde zadost /maze, tak server posle vygenerovane hraci pole
app.get(`/maze`, (req, res) => {

    res.send({
        cells
    })

});

let players = {};
//let currentSockets = [];

//---------------------------------------------------------------------------------------
//socket.io

io.on('connection', socket => {
    //console.log(socket.id);
    socket.on('test', data => {
        //console.log('recieved: ', data, 'from' + socket.id);
        socket.broadcast.emit('test', data);

    });
    //hrac se odpojil
    socket.on('disconnect', () => {

        delete players[socket.id];
        socket.broadcast.emit('playerDis', socket.id);

    })
    //pripojil se novy hrac
    socket.on('newPl', data => {
        //console.log('New  Player');
        //console.log(data);


        socket.emit('players', players);

        //console.log(players);

        players[socket.id] = {
            x: data.x,
            y: data.y,
            col: data.col,
            skin: data.s,
            id: socket.id
        }

        let resp = {
            x: data.x,
            y: data.y,
            col: data.col,
            skin: data.s,
            id: socket.id
        }

        socket.broadcast.emit('newPl', resp);

    })
    //pozice hrace
    socket.on('pos', pos => {

        let data = {
            x: pos.x,
            y: pos.y,
            id: socket.id

        }
        socket.broadcast.emit('pos', data);
    });
    //hrac vystrelil
    socket.on('shooting', data => {

        let resp = {
            x: data.x,
            y: data.y,
            tX: data.tX,
            tY: data.tY,
            id: socket.id

        }
        socket.broadcast.emit('shooting', resp);
    });
    //hrac nekoho zasahnul
    socket.on('hit', data => {
        socket.broadcast.emit('hit', data.ids);
    })
});

