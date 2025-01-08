import Vue from 'vue';
import './style.css';
import App from './App.vue';
// import tool from 'app2/tool';
// console.log('tool', tool);


new Vue({
    el: '#app',
    render(h) {
        return h(App);
    },
});