let maze;
let fr = 0;
let walls = [];
let speed, allowMovement = true;
const cell_r = 100;
let cells = [];
let socket;
let enemies = [];
let bullet, wall, menuImg;
let menu;
let devMode = false;

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
    player = new Player((random(maze.cells).x + cell_r / 2), (random(maze.cells).y + cell_r / 2), {
        r: random(50, 255),
        g: random(50, 255),
        b: random(50, 255)
    });
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
    /*socket.on('newPl', data => {
        enemies.push({
            player: new Player(data.player.x, data.player.y, data.player.col),
            id: data.id
        })
    });*/



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
    player.aim.set_dir(mouseX, mouseY);
    player.showHealth(15, 780);
    player.showAmmo(15, 760, bullet);


    menu.show(devMode);
    drawFramerate();
    drawCursor(mouseX, mouseY, 15);

    if (menu.devMode) {
        walls.forEach(wall => {
            wall.show()
        });
        player.ammo = player.maxAmmo;
        //player.health = player.maxHealtht;

    }

    for (let i = walls.length - 5; i < walls.length; ++i) {
        walls[i].show();
    }


    /*
    for (const enemy of enemies) {
        enemy.show(mouseX, mouseY, walls);
    }*/

    checkMovement(allowMovement);

    if (mouseIsPressed && !menu.showMenu) {
        player.isShooting = true;
    } else {
        player.isShooting = false;
    }



    menu.saveChanges();

    sendPos(player.pos);
}

function keyPressed() {
    if (keyCode === 27) {
        menu.showMenu = !menu.showMenu;
        if (!menu.showMenu) {
            menu.hide();
        }

    }
}


function mouseClicked() {
    /* let total = 0;
     for (let item of frm) {
         total += item;

     }
     console.log(total / frm.length);*/


    if (player.ammo === 0) {
        return
    }
    if (!menu.showMenu)
        player.ammo -= 1;
}


function sendPos(pos) {
    socket.emit('pos', {
        x: pos.x,
        y: pos.y
    });
}


function checkMovement(allowMovement) {
    if (allowMovement) {
        if (keyIsDown(65)) {
            player.move_x(-speed * (deltaTime / 10), cell_r, cells);
        }

        if (keyIsDown(68)) {
            player.move_x(speed * (deltaTime / 10), cell_r, cells);
        }

        if (keyIsDown(87)) {
            player.move_y(-speed * (deltaTime / 10), cell_r, cells);
        }

        if (keyIsDown(83)) {
            player.move_y(speed * (deltaTime / 10), cell_r, cells);
        }
    }
}
