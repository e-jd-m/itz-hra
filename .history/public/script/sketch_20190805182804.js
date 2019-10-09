let maze;
let fr = 0;
let walls = [];
let speed;
const cell_r = 100;
let cells = [];
let socket;
let enemies = [];
let bullet, wall, menuImg;
let menu;



function preload() {
    maze = loadJSON('/maze');
    bullet = loadImage('img/bullet.png');
    wall = loadImage('img/wall.png')
    menuImg = loadImage('img/menu.png')
}

function setup() {

    const canvas = createCanvas(800, 800);
    canvas.parent('#game');
    noCursor();

    menu = new Menu();
    player = new Player((random(maze.cells).x + cell_r / 2), (random(maze.cells).y + cell_r / 2), {
        r: random(0, 255),
        g: random(0, 255),
        b: random(0, 255)
    });
    for (let c of maze.cells) {
        if (c.walls[0]) {
            walls.push(new Wall(c.x, c.y, c.x + c.a, c.y, ))
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


    speed = 2;
    socket = io.connect('http://localhost:42069');
    socket.emit('newPl', {
        x: player.pos.x,
        y: player.pos.y,
        col: player.col
    });
    socket.on('newPl', data => {
        enemies.push({
            player: new Player(data.player.x, data.player.y, data.player.col),
            id: data.id
        })
    });



    preventScrolling();
}
let frm = [];


function draw() {
    background(0);
    //frameRate(30);
    //frm.push(frameRate());



    player.show(mouseX, mouseY, walls);

    player.look(walls);
    player.aim.set_dir(mouseX, mouseY);
    player.showHealth(15, 780);
    player.showAmmo(15, 760, bullet);

    drawFramerate(frameCount, frameRate);
    drawCursor(mouseX, mouseY, 15);

    walls.forEach(wall => {
        //wall.show()
    });


    for (const enemy of enemies) {
        enemy.show(mouseX, mouseY, walls);
    }

    checkMovement();

    if (mouseIsPressed) {
        player.isShooting = true;
    } else {
        player.isShooting = false;
    }

    menu.show();

    menu.save

    sendPos(player.pos);
}

function keyPressed() {
    if (keyCode == 27) {
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
    };
    player.ammo -= 1;
    player.isShooting = true;
}


function drawCursor(x, y, r) {
    push();
    noFill();
    stroke(255, 0, 0);
    ellipse(x, y, r);
    line(x, y, x, y - r / 2);
    line(x, y, x, y + r / 2);
    line(x, y, x - r / 2, y);
    line(x, y, x + r / 2, y);
    pop();
}

function drawFramerate(frameCount, frameRate) {
    push();
    fill(255);
    if (frameCount % 5 == 0) {
        fr = frameRate().toFixed(2);
    }
    stroke(255);
    textSize(15);
    text(fr, 10, 15);
    pop();
}

function sendPos(pos) {
    socket.emit('pos', {
        x: pos.x,
        y: pos.y
    });
}


function checkMovement() {
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