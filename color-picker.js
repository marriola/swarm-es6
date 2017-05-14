let Colors = [
    '#008',
    '#080',
    '#088',
    '#800',
    '#808',
    '#880',
    '#888',
    '#fff',
    '#00f',
    '#0f0',
    '#0ff',
    '#f00',
    '#f0f',
    '#ff0',
    '#fff'
];

let ColorPicker = Vue.component('color-picker', {
    template: '#color-picker-template',
    data: function() {
        return {
            showPalette: false,
            colors: Colors
        };
    },
    props: ['config'],
    methods: {
        openPicker: function() {
            this.showPalette = true;
        },
        pick: function(c) {
            this.config.color = c;
            this.showPalette = false;
        }
    }
    // template: '<div>hi</div>'
});