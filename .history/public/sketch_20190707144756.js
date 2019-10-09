

function setup() {

}

function draw() {
    
}

async function getMaze() {
    let re = await (await fetch(`/maze`)).json();
}

