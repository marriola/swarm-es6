let flockStrategy = (function() {
    function randomWalk(matrix, drone) {
        let dx = Math.floor(Math.random() * 3) - 1;
        let dy = Math.floor(Math.random() * 3) - 1;
        matrix.move(drone, dx, dy);
    }

    function strategyFactory({
        radius,
        flockThreshold,
        wanderThreshold,
        hardAvoid=false,
        alwaysAvoid=false,
        complexAvoid=false
    }) {
        function strategy(matrix, drone) {
            if (Math.random() < wanderThreshold) {
                randomWalk(matrix, drone);
                return;
            }

            let nearest = matrix.nearestNeighbor(drone.x, drone.y, radius);
            if (nearest) {
                let { x, y } = nearest;
                let down = y - drone.y;
                let right = x - drone.x;
                let dy = Math.sign(down);
                let dx = Math.sign(right);

                let avoid = false;

                if (!alwaysAvoid && Math.sqrt(down**2 + right**2) <= flockThreshold) {
                    if (hardAvoid) {
                        avoid = true;
                    } else {
                        randomWalk(matrix, drone);
                        return;
                    }
                }

                if (alwaysAvoid || avoid) {
                    if (complexAvoid) {
                        let r = Math.random();
                        if (r < 0.33) {
                            dy *= -1;
                        } else if (r < 0.66) {
                            dx *= -1;
                        } else {
                            dy *= -1;
                            dx *= -1;
                        }                        
                    } else {
                        dy *= -1;
                        dx *= -1;
                    }
                }

                matrix.move(drone, dx, dy);
            } else {
                randomWalk(matrix, drone);
            }
        }

        return strategy;
    }

    return {
        strategyFactory
    };
})();
