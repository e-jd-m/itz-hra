
//pomocne funkce

//funkce pro zastaveni posouvani obrazu pri zmacknuti sipek
function preventScrolling() {
    window.addEventListener("keydown", function (e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false)
}

// prevedeni indexu z 2D pole na index v normalni poli
function index(i, j, cols, rows) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
        return -1;

    return i + j * cols;
}

//vykresleni vlastniho kurzoru
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

//vykresleni snimku za vterinu
function drawFramerate() {
    if (menu.showFps) {
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

}

function toggleMovement(allow) {
    allowMovement = allow;
}

function toggleDevMode(bool) {
    devMode = bool;
    return devMode;
}

function getDistance(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    return (dx * dx + dy * dy);
}

//listener na zmacknuti esc, otevira menu
function keyPressed() {
    if (keyCode === 27) {
        menu.showMenu = !menu.showMenu;
        if (!menu.showMenu) {
            menu.hide();
        }


    }
}


//odeslani pozice pres socket
function sendPos(pos) {
    socket.emit('pos', {
        x: pos.x,
        y: pos.y
    });
}

//kontorla, zda hrac macka klavesi pro pohyb
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


function addAmmo(p) {
    if (p.ammo < p.maxAmmo) {
        p.ammo += 1;
    }

}

