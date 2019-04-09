import React, {Component} from "react";

import {Platform, StyleSheet, Text, View, AppRegistry} from 'react-native';

import {createBottomTabNavigator,createAppContainer} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import Create from "./screens/Create";
import Saved from "./screens/Saved";

import { RemoteMessage } from 'react-native-firebase';
import { Notification, NotificationOpen }  from 'react-native-firebase';

import firebase from 'react-native-firebase';

import bgMessaging from './bgMessaging'; // <-- Import the file you created in (2)

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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

export default createAppContainer(createBottomTabNavigator({
  Create:{
    screen: Create,
    navigationOptions: {
      tabBarLabel: 'Create a reminder...',
      tabBarIcon: ({ tintColor }) => (
        <Icon name ="ios-search" color={tintColor} size={24}/>
      )
    }
  },
  Saved:{
    screen: Saved
  }
}));

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
