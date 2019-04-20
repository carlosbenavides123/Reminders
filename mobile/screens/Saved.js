import React, { Component } from "react";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'

import {RkCard, RkTheme} from 'react-native-ui-kitten';
import deviceStorage from '../services/deviceStorage';

RkTheme.setType('RkCard', 'lol', {
    header: {
      alignSelf: 'center',
    },
    content:{
      alignSelf:'center',
    }
  });

  RkTheme.setType('rkCardFooter', 'plz', {
    paddingVertical: 0, 
    paddingHorizontal: 0
  });

import {
    View,
    Text,
    StyleSheet,
    ListView,
    ScrollView,
    Button
} from "react-native";


class Saved extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reminders: [],
            jwt: ''
        }
        this.state.jwt = this.props.jwt;
        this.logout = this.logout.bind(this);
      }

    get_data_from_db = () => {
        auth = "Token" + " " + String(this.state.jwt);
        var config = {
            headers: {
                'Authorization': auth
            }
        };

        axios.get(`http://104.248.184.147:8000/api/reminder/reminder/`, config)
        .then(res => {
            this.setState({reminders: res.data})
            console.log(this.state.reminders)
        })
        .catch( err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.get_data_from_db()
    }
    renderRow(rowData) {
        return (<Text>{rowData}</Text>);
     }

    submit = () => {
    };


    reset = () => {

    };

    logout = () => {
        const { navigate } = this.props.navigation;
        jwt = deviceStorage.deleteJWT();
        navigate('SignIn')
    }

    render() {
        contents = this.state.reminders.map(function (item) {
            return (
              <View key={item.id}>
                <RkCard kType='lol'>
                    <View rkCardContent style={styles.rkCardFooter}>
                        <Text>{item.name} due {item.date} at {item.time}</Text>
                    </View>
                    <View rkCardFooter kType='plz' style={styles.rkCardFooter}>
                            <Icon.Button 
                                name="ios-close" 
                                size={25} 
                                backgroundColor="#ffffff" 
                                color="#808080"
                                onPress={ () => this.reset() }
                                />
                            <Icon.Button
                                name="ios-checkmark"
                                size={25}
                                backgroundColor="#ffffff"
                                color="#A9A9A9"
                                onPress={ () => this.submit() }
                                />
                </View>
                </RkCard>

              </View>
            );
         });

        return (
            <ScrollView>
                {contents}
            </ScrollView>
        );
    }
}
export default Saved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rkCardFooter: { 
        paddingHorizontal: 20,
        marginBottom: -20
    }
});

const card = StyleSheet.create({
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 20
})