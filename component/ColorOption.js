import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function ColorOption({ item }) {
    const { colorName, hexCode } = item;
    const [isSelected, setIsSeleced] = useState(false);
    const handleChange = () => {
        setIsSeleced(current => !current)
    }
    return (
        <View style={style.colorOption}>
            <Text style={{ color: hexCode }}>{colorName}</Text>
            <Switch
                onValueChange={handleChange}
                value={isSelected}
            />
        </View>
    )
};

const style = StyleSheet.create({
    colorOption: {
        height: 50,
        width: 200
    }
})
