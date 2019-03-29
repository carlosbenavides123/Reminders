import React, { Component } from "react";
import { Card } from "gestalt";
// import "gestalt/dist/gestalt.css";

import {
    View,
    Text,
    StyleSheet
} from "react-native";

class Saved extends Component {
    render() {
        return (
            <Card>
</Card>
            <View style={styles.container}>

                <Text>Saved</Text>
                {/* </Card> */}
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