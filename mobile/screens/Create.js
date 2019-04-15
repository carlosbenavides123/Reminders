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
    TouchableOpacity,
    Dimensions,
    Button
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons'
import {RkCard, RkTheme, RkTextInput, RkButton} from 'react-native-ui-kitten';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from "react-native-modal";
import ExtraDimensions from 'react-native-extra-dimensions-android';
import axios from 'axios';

import DeviceInfo from 'react-native-device-info';
import deviceStorage from '../services/deviceStorage';

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
    constructor(props) {
        super(props)
        this.state = {
            isDateVisible: false,
            isTimeVisible: false,
            label_day: "Tomorrow",
            label_time: "Morning",
            day: "Tomorrow",
            time: "Morning",
            text: "",
            modalVisible: false,
            jwt: this.props.jwt,
            android_id: this.props.fcm
        };
        console.log(this.state.jwt);
        console.log(this.state.android_id);
    }

    _showDatePicker = () => this.setState({ isDateVisible: true });
    _hideDatePicker = () => this.setState({ isDateVisible: false });

    _showTimePicker = () => this.setState({ isTimeVisible: true });
    _hideTimePicker = () => this.setState({ isTimeVisible: false });

    _handleDatePicked = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"];

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

        this.state.time = hours+":"+minutes

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        var strTime = hours + ':' + minutes + ' ' + ampm;

        this.state.label_time = strTime;
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
            this.setState({ label_day: val, day: val });
        }
    }

    pickTime = (val) => {
        if(val== "set_time"){
            this._showTimePicker();
        } else {
            this.setState({ label_time: val });
        }
    }

    reset = () => {
        this.setState({ isDateVisible: false })
        this.setState({ isTimeVisible: false })
        this.setState({ label_day: "Tomorrow" })
        this.setState({ label_time: "Morning" })
        this.setState({ day: "Tomorrow" })
        this.setState({ time: "Morning" })
        this.setState({ text: "" })
        this.setState({ send: false })
        this.setState({ modalVisible: false })
    };

    submit = () => {
        this.setState({ modalVisible: true })
        var deviceId = DeviceInfo.getUniqueID();
        this.setState({ send: true })
    };

    post_to_db = () => {

        var data = {
            "name": this.state.text,
            "date": this.state.day,
            "time": this.state.time,
            "jwt": this.state.jwt,
            "android_id": this.state.android_id
        }

        axios.post(`http://104.248.184.147:8000/api/reminder/reminder/`, data, {
            headers: { 'Authorization': 'Token ' + this.state.jwt }
        })
        .then(res => {
            console.log(res);
            this.reset()
        })
        .catch( err => {
            // todo create validation errors...
            this.setState({ modalVisible: false })
            console.log(err);
        });
    }

    renderModal() {

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
          ? Dimensions.get("window").height
          : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

        return (
            <View>
                { 
                    this.state.modalVisible == true &&
                    (
                        <Modal 
                        style={styles.modalContent}
                        isVisible={this.state.modalVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight}
                        >
                            {this.renderModalContent()}
                        </Modal>
                    )
                }
            </View>
        )
      }

    renderModalContent = () => (
        <View>
            <Text>
                Remember {this.state.text} at {this.state.label_day} {this.state.label_time}
            </Text>
            {this.renderButton()}
        </View>
      );

      renderButton = () => (
        <Button
        style={{backgroundColor: 'red'}}
        onPress={ () => this.post_to_db()}
        title="button"
        >Ok, got it!</Button>
      );

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} screenProps={{jwt: this.state.jwt}}>

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
                     is24Hour={false}
                 />

                {this.renderModal()}

                <View style={{ flex: 1 }}>

                    <RkCard kType='lol' style={card}>
                        <View rkCardHeader>
                            <Text style={header_text}>Add a reminder...</Text>
                        </View>

                        <View rkCardContent>

                            <RkTextInput
                                rkType='progress' 
                                placeholder='Title'
                                value ={this.state.text}
                                onChangeText={(text) => this.setState({text})}
                            />

                            <View>

                                <Picker
                                    onValueChange={(itemValue, itemIndex) => this.pickDate(itemValue)}
                                >
                                    <Picker.Item label={this.state.label_day} value={this.state.label_day}/>
                                    <Picker.Item label={ (this.state.label_day == "Today") ? "Tomorrow" : "Today" } value={ (this.state.label_day == "Today") ? "Tomorrow" : "Today" } />
                                    <Picker.Item label="➡️  Select Day..." value="set_day"/>
                                </Picker>

                                <Picker
                                    onValueChange={(itemValue, itemIndex) => this.pickTime(itemValue)}
                                >
                                    <Picker.Item label={this.state.label_time} value={this.state.label_time}/>
                                    <Picker.Item label={ (this.state.label_time === "Afternoon") ? "Morning" : "Afternoon" } value={ (this.state.label_time === "Afternoon") ? "Morning" : "Afternoon" }/>
                                    <Picker.Item label={ (this.state.label_time === "Evening") ? "Morning" : "Evening" } value={ (this.state.label_time === "Evening") ? "Morning" : "Evening" }/>
                                    <Picker.Item label="➡️  Set time..." value="set_time" />
                                </Picker>
                            </View>
                        </View>

                        <View rkCardFooter>
                            <Icon.Button 
                                name="ios-close" 
                                size={35} 
                                backgroundColor="#ffffff" 
                                color="#808080"
                                onPress={ () => this.reset() }
                                />
                            <Icon.Button
                                name="ios-checkmark"
                                size={35}
                                backgroundColor="#ffffff"
                                color="#A9A9A9"
                                onPress={ () => this.submit() }
                                />
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
    },
    modalContent: {
        backgroundColor: "white",
        padding: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
      button_modal: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
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
