
let Maze;


function setup() {

}

function draw() {
    
}

async function getMaze() {
     Maze = await (await fetch(`/maze`)).json();
}

