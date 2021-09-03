import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Switch, FlatList } from 'react-native';
import COLORS from '../assets/FormColors';
import { v4 as uuid } from 'uuid'

export default function AddNewPaletteModal({ navigation }) {

    const [paletteName, setPaletteName] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);

    const handleSubmit = useCallback(() => {
        if (!paletteName) {
            Alert.alert('Please enter a palette name')
        } else if (selectedColors.length < 3) {
            Alert.alert('Please add 3 colors minimum')
        } else {
            const newColorPalette = {
                paletteName,
                colors: selectedColors,
                id: uuid()
            }
            navigation.navigate('Home', { newColorPalette })
        }
    }, [paletteName, selectedColors]);

    const handleValueChange = useCallback((value, color) => {
        if (value === true) {
            setSelectedColors(colors => [...colors, color])
        } else {
            setSelectedColors(colors =>
                colors.filter(
                    selectedColor => color.colorName !== selectedColor.colorName
                ))
        }
    }, [])

    return (
        <View style={style.container}>
            <Text style={style.name}>Name your new palette</Text>
            <TextInput
                style={style.input}
                value={paletteName}
                onChangeText={value => setPaletteName(value)}
                placeholder='My Cool Palette'
            />
            <FlatList
                data={COLORS}
                keyExtractor={item => item.colorName}
                renderItem={({ item }) => (
                    <View style={style.color}>
                        <View style={[style.box, { backgroundColor: item.hexCode }]}></View>
                        <Text>{item.colorName}</Text>
                        <Switch
                            value={
                                !!selectedColors.find(color => color.colorName === item.colorName)
                            }
                            onValueChange={(selected) => { handleValueChange(selected, item) }} />
                    </View>
                )}
            />
            <TouchableOpacity style={style.button} onPress={handleSubmit} >
                <Text style={style.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
        // <AddNewPalette />
    )
};

const style = StyleSheet.create({
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 30
    },
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1
    },
    button: {
        height: 40,
        backgroundColor: 'teal',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    name: {
        marginBottom: 10,
    },
    color: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    box: {
        height: 30,
        width: 30,
        marginHorizontal: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .3,
        shadowRadius: 2,
        elevation: 2, // for Android  (no box-shadow)
    }
});