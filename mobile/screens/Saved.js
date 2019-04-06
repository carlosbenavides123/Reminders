import React, { Component } from "react";
import axios from 'axios';

import {RkCard, RkTheme} from 'react-native-ui-kitten';

RkTheme.setType('RkCard', 'lol', {
    header: {
      alignSelf: 'center',
    },
    content:{
      alignSelf:'center',
    }
  });

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
                <RkCard kType='lol' style={card}>
                    <View rkCardContent>
                        <Text>{item.name} {item.date}</Text>
                    </View>
                </RkCard>
              </View>
            );
         });

        return (
            <View style={styles.container}>
                {contents}
            </View>
        );
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


const card = StyleSheet.create({
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 20
})