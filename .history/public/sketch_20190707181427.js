let gener;
let cells = [];

function preload() {
    gener = loadJSON('/maze');
}

function setup() {
    maze = gener.cells;
    for (cell of maze) {
        cells.push(new Cell(cell.))
    }

}

function draw() {

}

function showMaze() {
    
}

