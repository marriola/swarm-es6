class Cell {
    constructor() {
        this.contents = [];
    }

    add(thing) {
        this.contents.push(thing);
    }

    remove(thing) {
        this.contents = this.contents.filter(x => x !== thing);
    }

    clear() {
        for (let thing of this.contents) {
            if (thing.constructor.name === 'Drone') {
                thing.destroy();
            }
        }

        this.contents = [];
    }

    get(type) {
        return this.contents.find(x => x.constructor.name === type);
    }

    getAll(type) {
        return this.contents.filter(x => x.constructor.name === type);
    }

    isEmpty() {
        return this.contents.length == 0;
    }
}
