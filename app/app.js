import Vue from "nativescript-vue";
import Vuex from 'vuex'
import Home from "./components/Home";
import ReminderCard from "./components/ReminderCard";
import BottomNav from "./components/BottomNav";
import Login from "./components/Login"

import store from './store/store';

Vue.registerElement('BottomNavigation', () => require('nativescript-bottom-navigation').BottomNavigation);
Vue.registerElement('BottomNavigationTab', () => require('nativescript-bottom-navigation').BottomNavigationTab);
Vue.use(Vuex)

new Vue({
    template: `
            <Login />
        `,
    components: {
        Home,
        ReminderCard,
        BottomNav,
        Login,
    },
    store
}).$start();
