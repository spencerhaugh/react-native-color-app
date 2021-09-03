import React, { useState } from 'react';
import { View, Text, Switch, FlatList, StyleSheet } from 'react-native';
import COLORS from '../assets/FormColors';
import ColorOption from './ColorOption';

export default function AddNewPalette() {

    const [selectedColors, setSelectedColors] = useState([]);

    return (
        <FlatList
            style={style.list}
            data={COLORS}
            keyExtractor={item => item.hexCode}
            renderItem={({ item }) => { <ColorOption color={item} /> }}
        >

        </FlatList>
    )
};

const style = StyleSheet.create({
    list: {
        padding: 10,
        backgroundColor: 'white'
    }
});
