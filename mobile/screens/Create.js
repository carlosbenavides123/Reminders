import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    Picker
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {RkCard, RkTheme, RkTextInput} from 'react-native-ui-kitten';

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

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <RkCard kType='lol' style={card}>
                        <View rkCardHeader>
                            <Text style={header_text}>Add a reminder...</Text>
                        </View>
                        {/* <Image rkCardImg source={require('../img/sea.jpg')}/> */}
                        <View rkCardContent>
                            <RkTextInput rkType='progress' placeholder='Title'/>
                            <View>
                                <Picker>
                                    <Picker.Item label="Java" value="java"/>
                                    <Picker.Item label="JavaScript" value="js"/>
                                </Picker>
                            </View>
                        </View>
                        <View rkCardFooter>
                            <Text>Footer</Text>
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