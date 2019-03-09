import Vue from "nativescript-vue";

import Home from "./components/Home";
import ReminderCard from "./components/ReminderCard";
import BottomNav from "./components/BottomNav";
import Login from "./components/Login"

Vue.registerElement('BottomNavigation', () => require('nativescript-bottom-navigation').BottomNavigation);
Vue.registerElement('BottomNavigationTab', () => require('nativescript-bottom-navigation').BottomNavigationTab);

new Vue({

    template: `
            <Login />
        `,

    components: {
        Home,
        ReminderCard,
        BottomNav,
        Login,
    }
}).$start();
