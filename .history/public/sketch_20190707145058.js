
let Maze;


function setup() {
    getMaze();
    console.log(Maze);
}

function draw() {
    
}

async function getMaze() {
    let resp= (await (await fetch(`/maze`)).json());
    let Maze = resp.resp;
}

