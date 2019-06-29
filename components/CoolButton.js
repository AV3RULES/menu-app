import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CoolButton = ({label, action}) => (
    <TouchableOpacity onPress={ action }>
        <View style={[styles.button]}>
            <Text style={[styles.text]}>
                {label}
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        backgroundColor: '#2f95dc',
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 30,
        padding: 10,
    },
});

export default CoolButton;