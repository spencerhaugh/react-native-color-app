import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ColorBox({ hexCode, colorName }) {

    const boxStyle = {
        backgroundColor: hexCode,
    }
    const textStyle = {
        // Return dark or light text based on bg color
        color: parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1 ? '#333' : 'white'
    }

    return (
        <View style={[style.colorBox, boxStyle]}>
            <Text style={[style.colorBoxText, textStyle]}>{colorName} {hexCode}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    colorBox: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#2aa198',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .3,
        shadowRadius: 2,
        elevation: 2, // for Android  (no box-shadow)
    },
    colorBoxText: {
        color: 'white',
        fontWeight: 'bold',
    },
})