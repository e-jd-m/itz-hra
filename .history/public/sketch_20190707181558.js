let gener;
let cells = [];

function preload() {
    gener = loadJSON('/maze');
}

function setup() {
    createCanvas(800,800)
    maze = gener.cells;
    for (cell of maze) {
        cells.push(new Cell(cell.i, cell.j, cell.a, cell.walls));
    }

}

function draw() {
    for (cell of cells) {
        cell.show();
    }
}



