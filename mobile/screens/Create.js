import React, { Component } from "react";
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
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {RkCard, RkTheme, RkTextInput} from 'react-native-ui-kitten';
import DateTimePicker from 'react-native-modal-datetime-picker';

// when input state is not null...
RkTheme.setType('RkTextInput', 'progress', {
    input: {
        backgroundColor: 'white',
        marginLeft: 0,
        marginHorizontal: 0,
        borderRadius: 5
      },
    labelColor:'blue',
    underlineColor:'blue',
    underlineWidth:1,
    placeholderTextColor:"#87ceeb",
});

RkTheme.setType('RkCard', 'lol', {
    header: {
      alignSelf: 'center',
    },
    content:{
      alignSelf:'center',
    }
  });

class Create extends Component {

    state = {
        isDateVisible: false,
        isTimeVisible: false,
        day: "Tomorrow"
      };

    _showDatePicker = () => this.setState({ isDateVisible: true });
    _hideDatePicker = () => this.setState({ isDateVisible: false });

    _showTimePicker = () => this.setState({ isTimeVisible: true });
    _hideTimePicker = () => this.setState({ isTimeVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDatePicker();
      };
    
    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    pickDate = (val) =>{
        this.state.isDateVisible = val
        if(this.state.isDateVisible == "set_day"){
            this._showDatePicker();
        }
        console.log(this.state.isDateVisible)
    }

    pickTime = (val) =>{
        this.state.isTimeVisible = val
        if(this.state.isTimeVisible == "set_time"){
            this._showTimePicker();
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <DateTimePicker
                    isVisible={this.state.isDateVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDatePicker}
                />
 
                 <DateTimePicker
                     isVisible={this.state.isTimeVisible}
                     onConfirm={this._handleDatePicked}
                     onCancel={this._hideTimePicker}
                     mode="time"
                 />

                <View style={{ flex: 1 }}>

                    <RkCard kType='lol' style={card}>
                        <View rkCardHeader>
                            <Text style={header_text}>Add a reminder...</Text>
                        </View>
                        {/* <Image rkCardImg source={require('../img/sea.jpg')}/> */}
                        <View rkCardContent>
                            <RkTextInput rkType='progress' placeholder='Title'/>
                            <View>

                                <Picker
                                    onValueChange={(itemValue, itemIndex) => this.pickDate(itemValue)}
                                >
                                    <Picker.Item  style={picker_style} label={this.state.day} value="tomorrow"/>
                                    <Picker.Item label="Today" value="today"/>
                                    <Picker.Item label="➡️  Select Day..." value="set_day"/>
                                </Picker>

                                <Picker
                                    onValueChange={(itemValue, itemIndex) => this.pickTime(itemValue)}
                                >
                                    <Picker.Item label="Morning" value="Morning"/>
                                    <Picker.Item label="Afternoon" value="Afternoon"/>
                                    <Picker.Item label="Evening" value="Evening"/>
                                    <Picker.Item label="➡️  Set time..." value="set_time" />
                                </Picker>
                                <Picker>
                                    <Picker.Item label="None" value="none"/>
                                </Picker>
                            </View>
                        </View>
                        <View rkCardFooter>
                            <Icon.Button name="ios-close" size={35} backgroundColor="#ffffff" color="#808080" />
                            <Icon.Button name="ios-checkmark" size={35} backgroundColor="#ffffff" color="#A9A9A9" />
                        </View>
                    </RkCard>
                </View>
            </SafeAreaView>
        );
    }
}
export default Create;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const card = StyleSheet.create({
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 20
})

const header_text = StyleSheet.create({
    fontSize: 12.5,
})

const label = StyleSheet.create({
    fontSize: 10
})

const picker_style = StyleSheet.create({
    width: 10000
})
