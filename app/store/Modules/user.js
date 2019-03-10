/* eslint-disable */
import Vue from 'vue';
import axios from "axios";

const user = {
    namespaced: true,
    state:{
        token:null
    },
    getters:{
        getToken(state){
            return state.token;
        }
    },
    mutations:{
        sign_in_user(state, authData){
            state.token = authData['response']['data']['token'];
            console.log(state.token);
        }
    },
    actions:{
        login({commit}, payload){
            axios.post('http://10.0.2.2:8000/api/user/token/', {
                email: payload.email,
                password: payload.password
            }).then(function (response) {
                commit("sign_in_user",{
                    response,
                });
            })
            .catch(function (error) {
                console.log(error.response);
            });
        }
    }
}

export default user;