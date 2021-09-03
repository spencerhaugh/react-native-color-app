import React from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import ColorBox from '../component/ColorBox';

export default function ColorPalette({ route }) {
    const { paletteName, colors } = route.params;
    return (
        <FlatList
            style={style.container}
            data={colors}
            keyExtractor={item => item.hexCode}
            renderItem={({ item }) =>
                <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
            }
            ListHeaderComponent={
                <Text style={style.heading}>{paletteName}</Text>
            }
        />
    )
};

const style = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    container: {
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    }
});
