

function setup() {
    
}

function draw() {
    
}

async function getMaze() {
    let Maze = await (await fetch(`/maze`)).json();
}

