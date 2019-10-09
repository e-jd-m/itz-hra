let maze;

function preload()

function setup() {
    getMaze();

}

function draw() {

}

async function getMaze() {
    let resp = (await (await fetch(`/maze`)).json());
    maze = resp.cells;

}