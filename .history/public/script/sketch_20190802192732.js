class Wall {
    constructor(x1, y1, x2, y2, exists) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);

    }
    show() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}


let maze;
let fr = 0;
let walls = [];
let speed;
const cell_r = 100;
let cells = [];
let socket;
let enemies = [];

function preload() {
    maze = loadJSON('/maze');
}

function setup() {
    const canvas = createCanvas(800, 800);
    canvas.parent('#game');
    noCursor();


    player = new Player((random(maze.cells).x + cell_r / 2), (random(maze.cells).y + cell_r / 2), {
        r: random(0, 255),
        g: random(0, 255),
        b: random(0, 255)
    });
    for (let c of maze.cells) {
        if (c.walls[0]) {
            walls.push(new Wall(c.x, c.y, c.x + c.a, c.y, c.walls))
        }
        if (c.walls[1]) {
            walls.push(new Wall(c.x + c.a, c.y, c.x + c.a, c.y + c.a, c.walls));
        }
        if (c.walls[2]) {
            walls.push(new Wall(c.x + c.a, c.y + c.a, c.x, c.y + c.a, c.walls));
        }
        if (c.walls[3]) {
            walls.push(new Wall(c.x, c.y + c.a, c.x, c.y, c.walls));
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

}



function draw() {
    background(0);


    player.show(mouseX, mouseY, walls);

    player.look(walls);
    player.aim.set_dir(mouseX, mouseY);

    walls.forEach(wall => {
        //wall.show()
    });


    for (const enemy of enemies) {
        enemy.show(mouseX, mouseY, walls);
    }

    stroke(255, 0, 0);
    push();
    strokeWeight(5);
    point(mouseX, mouseY);
    pop();





    if (keyIsDown(65)) {
        if (checkCol(-speed, player.pos, true, cell_r)) {
            player.move_x(-speed);
        }

    }


    if (keyIsDown(68)) {
        if (checkCol(speed, player.pos, true, cell_r)) {
            player.move_x(speed);

        }
    }

    if (keyIsDown(87)) {
        if (checkCol(-speed, player.pos, false, cell_r)) {
            player.move_y(-speed);
        }
    }

    if (keyIsDown(83)) {
        if (checkCol(speed, player.pos, false, cell_r)) {
            player.move_y(speed);
        }
    }

    if (mouseIsPressed) {
        player.isShooting = true;
    } else {
        player.isShooting = false;
    }

    drawFramerate(frameCount, frameRate);

    sendPos(player.pos);
}


function drawCursor(x, y) {
    push();
    noFill();
    stroke(255,0,0);
    
    pop();
}

function drawFramerate(frameCount, frameRate) {
    push();
    fill(255);
    if (frameCount % 5 == 0) {
        fr = frameRate().toFixed(2);
    }
    stroke(255);
    textSize(20);
    text(fr, 10, 20);
    pop();
}

function sendPos(pos) {
    socket.emit('pos', {
        x: pos.x,
        y: pos.y
    });
}


function checkCol(speed, pos, isX, r) {

    let i = Math.floor(pos.x / r);
    let j = Math.floor(pos.y / r);


    let cell = cells[index(i, j, Math.floor(height / r), Math.floor(width / r))];

    if (isX) {
        if (speed > 0) {
            if (cell.walls[1]) {
                return !(pos.x + speed + player.r >= cell.x + r);
            }
        } else if (speed < 0) {
            if (cell.walls[3]) {
                return !(pos.x + speed - player.r <= cell.x);
            }
        }

    } else {
        if (speed > 0) {
            if (cell.walls[2]) {
                return !(pos.y + speed + player.r >= cell.y + r);
            }
        } else if (speed < 0) {
            if (cell.walls[0]) {
                return !(pos.y + speed - player.r <= cell.y);
            }
        }

    }

    return true;


}

function index(i, j, cols, rows) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
        return -1;

    return i + j * cols;
}