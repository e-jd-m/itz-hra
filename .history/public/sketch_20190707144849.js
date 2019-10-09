
let Maze;


function setup() {
    getMaze();
    console.log(Maze[0])
}

function draw() {
    
}

async function getMaze() {
     Maze = await (await fetch(`/maze`)).json();
}

