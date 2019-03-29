import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {RkCard, RkTheme} from 'react-native-ui-kitten';

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
                            <Text> quick brown fox jumps over the lazy dog</Text>
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    margin: 20
})

const header_text = StyleSheet.create({
    fontSize: 20,
})