import React, {Component} from "react";

import {Platform, StyleSheet, Text, View, AppRegistry} from "react-native";

import {createBottomTabNavigator,createAppContainer} from 'react-navigation';

import { RemoteMessage } from 'react-native-firebase';
import { Notification, NotificationOpen }  from 'react-native-firebase';

import firebase from 'react-native-firebase';

import bgMessaging from './bgMessaging'; // <-- Import the file you created in (2)

import { yes } from './router';
import { isSignedIn } from "./auth";
import { AsyncStorage } from 'react-native';
import deviceStorage from './services/deviceStorage.js';

// Current main application
AppRegistry.registerComponent('mobile', () => bootstrap);
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line

firebase.messaging().hasPermission()
  .then(enabled => {
    if (enabled) {
      // user has permissions
    } else {
      // user doesn't have permission
      firebase.messaging().requestPermission()
        .then(() => {
          // User has authorised 
 
        })
        .catch(error => {
          // User has rejected permissions  
        });
    } 
});

firebase.messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
      // user has a device token
      console.log("MADE IT HERE")
      console.log(fcmToken)
    } else {
      // user doesn't have a device token yet
      console.log("NO")

    } 
  });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true
    }
    
    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
  }  


  componentDidMount() {
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;

      firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;  
          }
        });
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
      this.notificationListener = firebase.notifications().onNotification((notification) => {
          // Process your notification as required
      });

    this.messageListener = firebase.messaging().onMessage((message) => {
        // Process your message as required
        console.log("##########################################")

        console.log(this.messageListener)
      });

    // isSignedIn()
    //   .then(res => this.setState({ signedIn: res, checkedSignIn: true}))
    //   .catch(() => alert("An error occured"));
  }

  componentWillUnmount() {
    console.log("##########################################")
    this.notificationDisplayedListener();
    this.notificationListener();

      this.messageListener();
      console.log(this.messageListener())
      this.notificationOpenedListener();

  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    console.log(signedIn);
    // if (!checkedSignIn) {
    //   return null;
    // }

    const Layout = createAppContainer(yes(this.state.jwt));
    return <Layout />;
  }
}
export default App;
