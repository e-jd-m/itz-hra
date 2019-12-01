let maze;
let fr = 0;
let walls = [];
let speed, allowMovement = true;
let cell_r;
let cells = [];
let socket;
let enemies = [];
let bullet, wall, menuImg;
let menu;
let devMode = true;
let theta = 0;
let step = 0.08;

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

    noCursor();

    menu = new Menu();
    cell_r = maze.cells[0].a;
    player = new Player((random(maze.cells).x + cell_r / 2), (random(maze.cells).y + cell_r / 2), {
        r: random(50, 255),
        g: random(50, 255),
        b: random(50, 255)
    });

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


    speed = 2;
    socket = io.connect('http://localhost:42069');



    socket.emit('newPl', {
        x: player.pos.x,
        y: player.pos.y,
        col: player.col
    });
    socket.on('newPl', data => {
        enemies.push({
            player: new Player(data.x, data.y, data.col)
        })
        //console.log(enemies);

    });
    socket.on('players', data => {
        for (const p of data) {
            enemies.push({
                player: new Player(p.x, p.y, p.col)
            });
        }
    })
    socket.on('playerDis', index => {
        console.log('dis');
        console.log(index);
        enemies.splice(index, 1);
        console.log(enemies);

    });

    socket.on('pos', data => {
        enemies[data.index].player.set_pos(data.x, data.y);
    })

    socket.on('test', data => {
        console.log('succ :)', data);
    });


    preventScrolling();
}
let frm = [];
let prof = [];

function draw() {
    background(0);
    //frameRate(5);
    //frm.push(frameRate());




    player.show(mouseX, mouseY, walls);

    player.look(walls);

    player.showHealth(15, 780);
    player.showAmmo(15, 760, bullet);


    menu.show(devMode);
    drawFramerate();
    drawCursor(mouseX, mouseY, 15);

    if (keyIsDown(LEFT_ARROW)) {
        theta -= step;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        theta += step;
    }



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

    for (let i = walls.length - 5; i < walls.length; ++i) {
        walls[i].show();
    }



    for (let i = 0; i < enemies.length; ++i) {
        enemies[i].player.show(10, 10, walls);
    }



    checkMovement(allowMovement);
    player.aim.set_dir(theta);

    if (keyIsDown(33) && !menu.showMenu) {
        player.isShooting = true;
    } else {
        player.isShooting = false;
    }




    menu.saveChanges();

    sendPos(player.pos);
}

