class Drone {
    constructor(key, x, y, svg, strategy, color, strokeColor) {
        this.key = 'd' + key;
        this.color = color;
        this.strokeColor = strokeColor;
        this.x = x;
        this.y = y;
        this.strategy = strategy;
        this.watching = null;

        if (!this.svg) {
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x * CELL_WIDTH);
            rect.setAttribute('y', y * CELL_HEIGHT);
            rect.setAttribute('width', CELL_WIDTH);
            rect.setAttribute('height', CELL_HEIGHT);
            rect.setAttribute('fill', this.color);
            if (this.strokeColor)
                rect.setAttribute('stroke', this.strokeColor);
            svg.appendChild(rect);
            this.svg = svg;
            this.rect = rect;
        }
    }

    destroy() {
        this.svg.removeChild(this.rect);
    }

    clone() {
        let newDrone = new Drone(this.key, this.x, this.y, null, this.strategy, this.color, this.strokeColor);
        newDrone.rect = this.rect;
        newDrone.svg = this.svg;
        return newDrone;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.rect.setAttribute('x', x * CELL_WIDTH);
        this.rect.setAttribute('y', y * CELL_HEIGHT);
    }
}
