

function setup() {
   getMaze();
   console.log("TCL: setup -> getMaze();", getMaze();)
}

function draw() {
    
}

async function getMaze() {
    let resp = await (await fetch(`/maze`)).json();
    return resp.Array;
}

