
let Maze;


function setup() {
    getMaze();
    console.log(Maze)
}

function draw() {
    
}

async function getMaze() {
     Maze = await (await fetch(`/maze`)).json();
}

