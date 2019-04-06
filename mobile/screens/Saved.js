import React, { Component } from "react";
import axios from 'axios';

import {
    View,
    Text,
    StyleSheet,
    ListView
} from "react-native";


class Saved extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reminders: []
        }
      }

    get_data_from_db = () => {
        var config = {
            headers: {
                'Authorization': 'Token 67683fffab1fc8dcd9fe5c66e6fa9a410c73a1cd'
            }
        };
        axios.get(`http://10.0.2.2:8000/api/reminder/reminder/`, config)
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

    render() {
        contents = this.state.reminders.map(function (item) {
            return (
              <View key={item.id}>
                <Text>{item.id} {item.date} {item.name}</Text>
              </View>
            );
         });

        // if(this.state.reminders){
        return (
            <View style={styles.container}>
                    {contents}
            </View>
        );
        // }
    }
}
export default Saved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});