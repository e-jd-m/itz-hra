

function setup() {

}

function draw() {
    
}

async function getMaze() {
    let resp = await (await fetch(`/maze`)).json();
    return resp
}

