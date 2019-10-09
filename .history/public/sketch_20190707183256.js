


let maze;
let cells = [];

function preload() {
    maze = loadJSON('/maze');
}

function setup() {
    createCanvas(800, 800);
    console.log(maze.cells);
    for (cell of maze.cells) {
        cells.push(new Cell(cell.i, cell.j, cell.a, cell.walls));
    }

    console.log(cells);

}

function draw() {
    background(0);
    for (cell of cells) {
        cell.show();
    }

}