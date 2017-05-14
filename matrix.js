function hex(n) {
    let s = n.toString(16);
    if (s.length < 2) {
        return '0' + s;
    }
    return s;
}

function randomColor() {
    let red, green, blue, average;

    do {
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        average = (red + green + blue) / 3;
    } while (average < 64);

    return '#' + hex(red) + hex(green) + hex(blue);
}

class Matrix {
    constructor(svg, rows, cols, rowWidth, colWidth) {
        this.svg = svg;
        this.rows = rows;
        this.cols = cols;
        this.width = cols * colWidth;
        this.height = rows * rowWidth;
        this.lastDroneKey = 0;
        this.drones = [];
        this.moves = [];
        this.movesTaken = new Uint8Array(rows * cols);

        this.matrix = [];
        for (let r = 0; r < rows; r++) {
            let row = [];
            for (let c = 0; c < cols; c++) {
                row.push(new Cell());
            }
            this.matrix.push(row);
        }
    }

    cellAt(x, y) {
        return this.matrix[y][x];
    }

    typeAt(x, y, type) {
        if (x < 0 || x >= this.cols ||
            y < 0 || y >= this.rows)
            return null;
        return this.cellAt(x, y).get(type);
    }

    allTypeAt(x, y, type) {
        if (x < 0 || x >= this.cols ||
            y < 0 || y >= this.rows)
            return null;
        return this.cellAt(x, y).getAll(type);
    }

    addDrone(strategy, color, strokeColor) {
        let x = -1, y = -1;
        while (x == -1 || this.typeAt(x, y, 'Drone')) {
            x = Math.floor(Math.random() * this.cols);
            y = Math.floor(Math.random() * this.rows);
        }

        let drone = new Drone(this.lastDroneKey, x, y, document.getElementById('matrix'), strategy, color, strokeColor);
        this.cellAt(x, y).add(drone);
        this.drones.push(drone);
        ++this.lastDroneKey;
    }

    move(drone, dx, dy, block=true) {
        let { x: x1, y: y1 } = drone;
        let x2 = Math.max(0, Math.min(this.cols - 1, x1 + dx));
        let y2 = Math.max(0, Math.min(this.rows - 1, y1 + dy));
        let coord = y2 * this.rows + x2;

        if (this.movesTaken[coord] || block && !this.cellAt(x2, y2).isEmpty()) {
            return;
        }

        let fromCell = this.cellAt(x1, y1);
        let toCell = this.cellAt(x2, y2);

        this.moves.push({ drone, fromCell, toCell, x: x2, y: y2 });
        this.movesTaken[coord] = 1;
    }

    nearestNeighbor(startX, startY, radius) {
        for (let step = 1; step <= radius; step++) {
            let neighbors = [];
            for (let x = startX - step; x <= startX + step; x++) {
                for (let y = startY - step; y <= startY + step; y++) {
                    if (x != startX || y != startY ) {
                        let piece = this.typeAt(x, y, 'Drone');
                        if (piece) {
                            neighbors.push(piece);
                        }
                    }
                }
            }

            if (neighbors.length > 0) {
                return neighbors[Math.floor(Math.random() * neighbors.length)];
            }
        }

        return null;
    }
    
    iterateNeighbors(startX, startY, radius, callback) {
        for (let y = startY - radius; y <= startY + radius; y++) {
            for (let x = startX - radius; x <= startX + radius; x++) {
                let piece = this.typeAt(x, y, 'Drone');
                if (piece) {
                    callback(piece);
                }
            }
        }
    }

    countNeighbor(startX, startY, radius) {
        let count = 0;
        this.iterateNeighbors(startX, startY, radius, drone => {
            ++count
        });
        return count;
    }

    findNeighbors(startX, startY, radius) {
        let neighbors = [];
        this.iterateNeighbors(startX, startY, radius, drone => {
            neighbors.push(drone)
        });
        return neighbors;
    }

    next() {
        for (let drone of this.drones) {
            if (drone.strategy) {
                drone.strategy(this, drone);
            }
        }

        while (this.moves.length) {
            let { drone, fromCell, toCell, x, y } = this.moves.pop();
            fromCell.remove(drone);
            toCell.add(drone);
            drone.move(x, y);
        }

        this.movesTaken.fill(0);
    }

    reset() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.cellAt(x, y).clear();
            }
        }

        this.movesTaken.fill(0);
        this.drones = [];
    }
}
