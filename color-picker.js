let Colors = [
    '#00a',
    '#0a0',
    '#0aa',
    '#a00',
    '#a0a',
    '#aa0',
    '#aaa',
    '#555',
    '#11f',
    '#1f1',
    '#1ff',
    '#f11',
    '#f1f',
    '#ff1',
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
            this.showPalette = !this.showPalette;
        },
        pick: function(c) {
            this.config.color = c;
            this.showPalette = false;
        }
    }
});