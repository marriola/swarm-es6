let Menu = new Vue( {
    el: '#menu',
    data: SwarmConfig,
    methods: {
        addDrones: function() {
            let { numDrones, radius, flockThreshold, wanderThreshold, hardAvoid, alwaysAvoid, complexAvoid, color } = this;

            let strategy = flockStrategy.strategyFactory({ radius, flockThreshold, wanderThreshold, hardAvoid, alwaysAvoid, complexAvoid });
            addDrones(matrix, strategy, numDrones, color);
        },
        
        clearDrones: function() {
            matrix.reset();
        }
    }
});