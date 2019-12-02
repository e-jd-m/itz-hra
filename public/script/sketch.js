let maze;
let fr = 0;
let walls = [];
const speed = 2
let allowMovement = true;
let cell_r;
let cells = [];
let socket;
let enemies = {};
let bullet, wall, menuImg;
let menu;
let devMode = true;

let shootCount = 0;

const defGameServer = 'http://localhost:42069';

p5.disableFriendlyErrors = true;

function preload() {
    maze = loadJSON('/maze');
    bullet = loadImage('img/bullet.png');
    wall = loadImage('img/wall.png');
    menuImg = loadImage('img/menu.png');
}

function setup() {

    const canvas = createCanvas(800, 800);
    canvas.parent('#game');

    let address = prompt("zadej adresu: ", defGameServer);
    socket = io.connect(address);

    noCursor();

    menu = new Menu();
    cell_r = maze.cells[0].a;
    player = new Player((random(maze.cells).x + cell_r / 2), (random(maze.cells).y + cell_r / 2), {
        r: random(50, 255),
        g: random(50, 255),
        b: random(50, 255)
    }, Math.floor(Math.random() * 3));

    /*player = new Player((maze.cells[5].x + cell_r / 2), (maze.cells[5].y + cell_r / 2), {
        r: random(50, 255),
        g: random(50, 255),
        b: random(50, 255)
    });*/

    //console.log(player);



    for (let c of maze.cells) {
        if (c.walls[0]) {
            walls.push(new Wall(c.x, c.y, c.x + c.a, c.y))
        }
        if (c.walls[1]) {
            walls.push(new Wall(c.x + c.a, c.y, c.x + c.a, c.y + c.a));
        }
        if (c.walls[2]) {
            walls.push(new Wall(c.x + c.a, c.y + c.a, c.x, c.y + c.a));
        }
        if (c.walls[3]) {
            walls.push(new Wall(c.x, c.y + c.a, c.x, c.y));
        }

        cells.push(new Cell(c.i, c.j, c.a, c.walls));

    }

    walls.push(new Wall(0, 0, width, 0));
    walls.push(new Wall(0, 0, 0, height));
    walls.push(new Wall(0, height, width, height));
    walls.push(new Wall(width, 0, width, height));







    socket.emit('newPl', {
        x: player.pos.x,
        y: player.pos.y,
        col: player.col,
        s: player.skin
    });
    socket.on('newPl', data => {
        enemies[data.id] = {
            player: new Player(data.x, data.y, data.col, data.skin)
        }


    });
    socket.on('players', data => {

        for (let [key, value] of Object.entries(data)) {
            enemies[key] = {
                player: new Player(value.x, value.y, value.col, value.skin)
            }
        }
        console.table(enemies);
    })
    socket.on('playerDis', id => {
        delete enemies[id];

    });

    socket.on('pos', data => {
        //console.log(data.index);
        const enemy = enemies[data.id];
        if (!enemy) {
            console.error('missing  enemy');
            return;
        }
        enemy.player.set_pos(data.x, data.y);

    })

    socket.on('shooting', data => {
        const enemy = enemies[data.id];
        if (!enemy) {
            console.error('missing  enemy');
            return;
        }
        //console.log(data.x, data.y);  
        enemy.player.shoot(data.x, data.y);

    });

    socket.on('test', data => {
        console.log('succ :)', data);
    });


    preventScrolling();

    setInterval(function () {
        addAmmo(player);
    }, 250);

    //setInterval(() => shootCount++, 100);


}
let frm = [];
let prof = [];

function draw() {
    background(0);
    //frameRate(5);
    //frm.push(frameRate());

    player.show(mouseX, mouseY, walls);

    player.look(walls);
    player.aim.set_dir(mouseX, mouseY);
    player.showHealth(15, 780);
    //player.showAmmo(15, 760, bullet);


    menu.show(devMode);
    drawFramerate();
    drawCursor(mouseX, mouseY, 15);

    if (menu.devMode) {
        walls.forEach(wall => {
            wall.show()
        });

        /*
        for (let i = 0; i < enemies.length; ++i) {
            enemies[i].player.show(10, 10, walls);
        }*/

        player.ammo = player.maxAmmo;
        //player.health = player.maxHealtht;

    }

    for (let [key, value] of Object.entries(enemies)) {
        //enemies[key].player.show();
        value.player.show();
    }







    checkMovement(allowMovement);

    if (mouseIsPressed && !menu.showMenu) {
        if (player.ammo > 0) {
            let pt = player.shoot(mouseX, mouseY);
            socket.emit('shooting', { x: mouseX, y: mouseY });

        }


    }



    menu.saveChanges();

    sendPos(player.pos);




}
/*
function mouseClicked() {
    if (!menu.showMenu) {
        let pt = player.shoot(mouseX, mouseY);
        socket.emit('shooting', { x: mouseX, y: mouseY });
        console.log('shooting');
    }
}*/