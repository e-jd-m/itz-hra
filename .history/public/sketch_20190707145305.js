
let Maze;


function setup() {
    getMaze();
   
    
    
}

function draw() {
     console.log(Maze);
}

async function getMaze() {
    let resp= (await (await fetch(`/maze`)).json());
    Maze = resp.resp;

}

