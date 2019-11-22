function preventScrolling() {
    window.addEventListener("keydown", function (e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false)
}

function index(i, j, cols, rows) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
        return -1;

    return i + j * cols;
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

