let maze;

function setup() {
    getMaze();

    

}

function draw() {
    console.log(maze);
}

async function getMaze() {
    let resp = (await (await fetch(`/maze`)).json());
    maze = resp.cells;


}