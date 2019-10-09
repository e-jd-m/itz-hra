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