let maze;

function setup() {
    getMaze();

    console.log(Maze)

}

function draw() {

}

async function getMaze() {
    let resp = (await (await fetch(`/maze`)).json());
    maze = resp.cells;


}