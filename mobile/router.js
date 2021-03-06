import React from "react";
import { Platform, StatusBar } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
  } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import firebase from 'react-native-firebase';
var token = '';
firebase.messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
      token = fcmToken;
      console.log("got token");
    } else {
      // user doesn't have a device token yet
      console.log("NO")
    } 
  });


import deviceStorage from './services/deviceStorage';
jwt = deviceStorage.getJWT();

import Create from "./screens/Create";
import Saved from "./screens/Saved";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}

export const SignedOut = createStackNavigator({
      SignIn: {
        screen: SignIn,
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
          header : null   
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
        }
    },
});

export const SignedIn = createBottomTabNavigator({
    Create:{
      screen: props => <Create {...{fcm: token, jwt: jwt._55}}/>,
      navigationOptions: {
        tabBarLabel: "Create a reminder...",
        tabBarIcon: ({ tintColor }) => (
          <Icon name ="md-create" color={tintColor} size={24}/>
        )
      }
    },
    Saved:{
      screen: props => <Saved {...{jwt: jwt._55}}/>,
      navigationOptions: {
        tabBarLabel: "My reminders",
        tabBarIcon: ({ tintColor }) => (
          <Icon name ="ios-search" color={tintColor} size={24}/>
        )
      }
    }
});

export const yes = (jwt = '') => {
    return createSwitchNavigator(
      {
        SignedOut: {
          screen: SignedOut
        },
        SignedIn:{
          screen: SignedIn
        }
      },
      {
        initialRouteName: jwt ? "SignedIn" : "SignedOut"
      }
    );
};