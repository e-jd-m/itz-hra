
let Maze;


function setup() {
    getMaze().then(
        console.log(Maze);
    
}

function draw() {
    
}

async function getMaze() {
    let resp= (await (await fetch(`/maze`)).json());
    let Maze = resp.resp;
}

