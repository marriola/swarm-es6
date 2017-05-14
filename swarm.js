const TURN_LENGTH = 33;
const WIDTH = 330;
const HEIGHT = 150;
const CELL_WIDTH = 4;
const CELL_HEIGHT = 4;

let SwarmConfig = {
    numDrones: 10,
    radius: 20,
    flockThreshold: 1,
    wanderThreshold: 30,
    alwaysAvoid: false,
    hardAvoid: false,
    complexAvoid: false,
    color: '#1f1'
};

function addDrones(matrix, strategy, n, color, stroke) {
    for (let i = 0; i < n; i++) {
        matrix.addDrone(strategy, color || randomColor(), stroke);
    }
}

function colorSpec(r, g, b) {
    return '#' + hex(r) + hex(g) + hex(b);
}

let matrixElement = document.querySelector('#matrix');
matrixElement.setAttribute('width', WIDTH * CELL_WIDTH);
matrixElement.setAttribute('height', HEIGHT * CELL_HEIGHT);

let matrix = new Matrix(matrixElement, HEIGHT, WIDTH, CELL_HEIGHT, CELL_WIDTH);

function matrixLoop() {
    let t1 = new Date().getTime();
    matrix.next();
    let t2 = new Date().getTime();
    setTimeout(matrixLoop, TURN_LENGTH - t2 + t1);
}

matrixLoop();