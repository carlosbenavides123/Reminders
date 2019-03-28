import React, {Component} from "react";
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator,createAppContainer} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import Create from "./screens/Create";
import Saved from "./screens/Saved";

class App extends React.Component {
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
