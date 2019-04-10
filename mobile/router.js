import React, {Component} from "react";
import { Platform, StatusBar } from "react-native";
import {createBottomTabNavigator, StackNavigator, SwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


import Create from "./screens/Create";
import Saved from "./screens/Saved";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}

export const SignedOut = StackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
            headerStyle
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In",
            headerStyle
        }
    }
});

export const SignedIn = createBottomTabNavigator({
    Create:{
      screen: Create,
      navigationOptions: {
        tabBarLabel: 'Create a reminder...',
        tabBarIcon: ({ tintColor }) => (
          <Icon name ="md-create" color={tintColor} size={24}/>
        )
      }
    },
    Saved:{
      screen: Saved,
      navigationOptions: {
        tabBarLabel: 'My reminders',
        tabBarIcon: ({ tintColor }) => (
          <Icon name ="ios-search" color={tintColor} size={24}/>
        )
      }
    }
});
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
  
export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn,
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initalRouteName: signedIn ? "SignedIn": "SignedOut"
        }
    )
}