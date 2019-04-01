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
        label_day: "Tomorrow",
        label_time: "Morning",
        day: "Tomorrow",
        time: "Morning"
      };

    _showDatePicker = () => this.setState({ isDateVisible: true });
    _hideDatePicker = () => this.setState({ isDateVisible: false });

    _showTimePicker = () => this.setState({ isTimeVisible: true });
    _hideTimePicker = () => this.setState({ isTimeVisible: false });

    _handleDatePicked = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"]

        // UX
        this.state.label_day = dayNames[date.getDay()] + ", "+ monthNames[date.getMonth()] + " " + date.getDate() 

        // send to BE
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        this.state.day = year + "/" + month + "/" + day;

        this._hideDatePicker();
      };

    _handleTimePicked = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;

        var strTime = hours + ':' + minutes + ' ' + ampm;

        this.state.label_time = strTime;
        this.state.time = hours+":"+minutes

        this._hideTimePicker();
    };
    
    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    pickDate = (val) =>{
        if(val == "set_day"){
            this._showDatePicker();
        } else {
            this.state.label_day = val
        }
    }

    pickTime = (val) =>{
        this.state.label_time = val
        if(this.state.label_time == "set_time"){
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
                     onConfirm={this._handleTimePicked}
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
                                    <Picker.Item  style={picker_style} label={this.state.label_day} value={this.state.label_day}/>
                                    <Picker.Item label="Today" value="Today"/>
                                    <Picker.Item label="➡️  Select Day..." value="set_day"/>
                                </Picker>

                                <Picker
                                    onValueChange={(itemValue, itemIndex) => this.pickTime(itemValue)}
                                >
                                    <Picker.Item label={this.state.label_time} value={this.state.label_time}/>
                                    <Picker.Item label="Afternoon" value="Afternoon"/>
                                    <Picker.Item label="Evening" value="Evening"/>
                                    <Picker.Item label="➡️  Set time..." value="set_time" />
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
