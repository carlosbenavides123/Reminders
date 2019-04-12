import React, { Component } from "react";
import {RkCard, RkTheme, RkTextInput, RkButton} from 'react-native-ui-kitten';
import { onSignIn } from "../auth";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Picker,
  TouchableHighlight,
  tintColor,
  TouchableOpacity,
  Dimensions,
  Button
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

import axios from 'axios';

export default class SignUp extends Component{
  constructor(props) {
    super(props)
    this.state = {
        email: "",
        password: "",
        password_again: ""
    };
}

post_to_db = () => {

  if (this.state.password != this.state.password_again){
      return;
  }

  name = this.state.email.split('@');

  var data = {
      "email": this.state.email,
      "name": name[0],
      "password": this.state.password
  }

  axios.post(`http://104.248.184.147:8000/api/user/create/`, data)
  .then(res => {
      console.log(res);
      this.props.navigation.navigate('Create')
  })
  .catch( err => {
      console.log(err);
  });
}

  render(){
    return(
    <View style={{ paddingVertical: 20 }}>
      <RkCard title="SIGN UP">
        <RkTextInput label={<Icon name={'ios-person'}/>} rkType='rounded' label='Email' onChangeText={(text) => this.setState({email: text})}/>
        <RkTextInput label={<Icon name={'md-lock'}/>} rkType='rounded' label='Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
        <RkTextInput label={<Icon name={'md-lock'}/>} rkType='rounded' label='Confirm Password...' onChangeText={(text) => this.setState({password_again: text})} secureTextEntry={true}/>

        <Button
          buttonStyle={{ marginTop: 20 }}
          title="Sign In"
          onPress={() => this.post_to_db()}
        />
      </RkCard>
    </View>
    )
  }
};