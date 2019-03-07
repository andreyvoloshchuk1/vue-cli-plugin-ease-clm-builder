import Vue from 'vue'
import App from '@/App'
import store from '@/state/store'
import router from '@/state/router'
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    iconfont: 'md',
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});