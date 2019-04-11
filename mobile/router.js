import React from "react";
import { Platform, StatusBar } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
  } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";


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
        navigationOptions: {
            title: "Sign In",
            headerStyle
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
            headerStyle
        }
    },
});

export const SignedIn = createBottomTabNavigator({
    Create:{
      screen: Create,
      navigationOptions: {
        tabBarLabel: "Create a reminder...",
        tabBarIcon: ({ tintColor }) => (
          <Icon name ="md-create" color={tintColor} size={24}/>
        )
      }
    },
    Saved:{
      screen: Saved,
      navigationOptions: {
        tabBarLabel: "My reminders",
        tabBarIcon: ({ tintColor }) => (
          <Icon name ="ios-search" color={tintColor} size={24}/>
        )
      }
    }
});

export const yes = (loggedIn = false) => {
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
        initialRouteName: loggedIn ? "SignedOut" : "SignedIn"
      }
    );
};