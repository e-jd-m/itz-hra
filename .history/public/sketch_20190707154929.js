let Maze;

function setup() {
    getMaze();

    co

}

function draw() {

}

async function getMaze() {
    let resp = (await (await fetch(`/maze`)).json());
    Maze = resp.cells;


}