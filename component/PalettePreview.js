import React from 'react';
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from 'react-native';

export default function PalettePreview({ colorPalette, handlePress }) {
    const previewColors = colorPalette.colors.slice(0, 4);

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={style.text}>{colorPalette.paletteName}</Text>
            <FlatList
                style={style.list}
                data={previewColors}
                keyExtractor={item => item.hexCode}
                renderItem={({ item }) => (
                    <View style={[style.box, { backgroundColor: item.hexCode }]}></View>
                )}
            />
        </TouchableOpacity>
    )
};

const style = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
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
    },
    list: {
        marginBottom: 20,
        flexDirection: 'row'
    }
})
