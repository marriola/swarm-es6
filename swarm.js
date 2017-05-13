const TURN_LENGTH = 33.333333;
const WIDTH = 660;
const HEIGHT = 300;
const CELL_WIDTH = 2;
const CELL_HEIGHT = 2;
const NUM_DRONES = 400;
const SENSING_RADIUS = 20;
const WANDER_THRESHOLD = 0.3;

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

let maxRange = 10;
for (let i = 5; i <= maxRange; i++) {
    let n = Math.floor(64 + 191 - i / maxRange * 191);
    let color = colorSpec(n, n, n);
    console.log(n, color);
    let myFlock = flockStrategy.strategyFactory({
        radius: SENSING_RADIUS,
        flockThreshold: i,
        wanderThreshold: WANDER_THRESHOLD,
        hardAvoid: true,
        complexAvoid: true
    });
    addDrones(matrix, myFlock, NUM_DRONES / maxRange, color);
}

let avoid = flockStrategy.strategyFactory({
    radius: SENSING_RADIUS,
    flockThreshold: 1,
    wanderThreshold: WANDER_THRESHOLD,
    hardAvoid: true,
    alwaysAvoid: true,
    complexAvoid: true
});
addDrones(matrix, avoid, 10, '#800', 'yellow');

function matrixLoop() {
    let t1 = new Date().getTime();
    matrix.next();
    let t2 = new Date().getTime();
    setTimeout(matrixLoop, TURN_LENGTH - t2 + t1);
}

matrixLoop();