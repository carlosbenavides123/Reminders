import React from "react";
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
import {RkCard, RkTheme, RkTextInput, RkButton} from 'react-native-ui-kitten';

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <RkCard title="SIGN IN">
      <RkTextInput label={<Icon name={'ios-person'}/>} rkType='rounded' label='Email'/>
      <RkTextInput label={<Icon name={'md-lock'}/>} rkType='rounded' label='Password'/>
      <RkTextInput label={<Icon name={'md-lock'}/>} rkType='rounded' label='Confirm Password...'/>

      <Button
        buttonStyle={{ marginTop: 20 }}
        title="SIGN UP"
        onPress={() => navigation.navigate("SignUp")}
      />
      {/* <Button
        buttonStyle={{ marginTop: 20 }}
        title="Sign In"
        onPress={navigation.navigate("SignUp")}
      /> */}
    </RkCard>
  </View>
);