import Vue from "nativescript-vue";
// import Vuex from 'vuex'
import Login from "./components/Login"
import master from "./Master"
import store from './store/store';
import * as firebase from "nativescript-plugin-firebase"

Vue.registerElement('BottomNavigation', () => require('nativescript-bottom-navigation').BottomNavigation);
Vue.registerElement('BottomNavigationTab', () => require('nativescript-bottom-navigation').BottomNavigationTab);
Vue.registerElement('CardView',() => require('nativescript-cardview').CardView);
// Vue.use(Vuex)


firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function () {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

new Vue({
    store,
    render: h => h("frame", [h(master)]),
    components:{
        Login
    }
  }).$start();
