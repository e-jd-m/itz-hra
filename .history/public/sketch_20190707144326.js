

function setup() {
   0 getMaze();
}

function draw() {
    
}

async function getMaze() {
    let resp = await (await fetch(`/maze`)).json();
    return resp.Array;
}

