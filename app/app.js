import Vue from "nativescript-vue";
// import Vuex from 'vuex'
import Login from "./components/Login"
import master from "./Master"
import store from './store/store';
require ("nativescript-local-notifications");

Vue.registerElement('BottomNavigation', () => require('nativescript-bottom-navigation').BottomNavigation);
Vue.registerElement('BottomNavigationTab', () => require('nativescript-bottom-navigation').BottomNavigationTab);
Vue.registerElement('CardView',() => require('nativescript-cardview').CardView);
// Vue.use(Vuex)

new Vue({
    store,
    render: h => h("frame", [h(master)]),
    components:{
        Login
    }
  }).$start();
