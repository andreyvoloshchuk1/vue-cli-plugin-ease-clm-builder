import Vue from 'vue'
import App from '@/App'
import store from '@/state/store'
import router from '@/state/router'

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
