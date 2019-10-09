let maze;

function preload() {
    maze = loadJSON('/maze');
}

function setup() {
    

}

function draw() {

}

async function getMaze() {
    let resp = (await (await fetch(`/maze`)).json());
    maze = resp.cells;

}