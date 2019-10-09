let maze;

function preload() {
    maze = loadJSON('/maze');
}

function setup() {
    maze = maze.cells;
    console.log(maze);

}

function draw() {

}

function showMaze()

