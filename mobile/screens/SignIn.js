import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

import {RkButton, RkTextInput, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects';

import axios from 'axios';

export default class SignIn extends Component{

  constructor(props) {
    super(props)
    this.state = {
        email: "",
        password: "",
        token: ""
    };
}

post_to_db = () => {
  var data = {
      "email": this.state.email,
      "password": this.state.password
  }

  axios.post(`http://104.248.184.147:8000/api/user/token/`, data)
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
    <View style={{flex: 1}}>
      <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('SignUp')}> 
        <Text style = {styles.close}>
            Register a account!
        </Text>
      </TouchableNativeFeedback >

      <View style={styles.container}>
        <View>
          <RkText style={styles.title}>
            SIGN IN
          </RkText>
        </View>

        <View style={{minHeight: 185}}>
          <Hoshi
            label={'Email'}
            borderColor={'#1F45FC'}
            borderHeight={1}
            inputPadding={16}
            inputStyle={{ color: '#5177FF' }}
            onChangeText={(text) => this.setState({email: text})}
          />
          <Hoshi
            label={'Password'}
            borderColor={'#1F45FC'}
            borderHeight={1}
            inputPadding={16}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
          </View>
          <View>
              <Button innerStyle={[{fontSize: 20}]}
                      title='Login!'
                      color='#C92228'
                      onPress={ () => this.post_to_db()}
                        />
            </View>

      </View>
      </View>
    )
  }
};

let styles = StyleSheet.create({
  container:{
    paddingHorizontal: 50,
    justifyContent: 'space-around',
    flex: 1
  },
  title:{
    fontSize: 42,
    textAlign: 'center'
  },
  inputLabel:{
    paddingBottom: 15
  },
  inputContainer:{
    marginTop: 40
  },
  input:{
    fontSize: 20,
  },
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },  
  close: {
    margin: 5,
    position: "absolute",
    top: 0,
    right: 10,
    height: 25,
    color: "#A9A9A9"
  }
});