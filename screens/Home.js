import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, RefreshControl, TouchableOpacity, Text } from 'react-native';
import PalettePreview from '../component/PalettePreview';

const Home = ({ navigation, route }) => {

    // If params returned from route, set newColorPalette to params
    const newColorPalette = route.params ? route.params.newColorPalette : undefined;

    const [colorPalettes, setColorPalettes] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getColorPalettes = useCallback(async () => {
        const result = await fetch('https://color-palette-api.kadikraman.now.sh/palettes');
        if (result.ok) {
            const paletteList = await result.json();
            setColorPalettes(paletteList);
        }
    }, []);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await getColorPalettes;
        setIsRefreshing(false);
    }, [])

    useEffect(() => {
        getColorPalettes();
    }, []);

    useEffect(() => {
        if (newColorPalette) {
            setColorPalettes(
                palettes => [newColorPalette, ...palettes]
            )
        }
    }, [newColorPalette])

    return (
        <FlatList
            style={style.list}
            data={colorPalettes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <PalettePreview
                    handlePress={() => navigation.navigate('ColorPalette', item)}
                    colorPalette={item}
                />
            )}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            // refreshControl={<RefreshControl refreshing={} onRefresh={() => { }} />}
            ListHeaderComponent={
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AddNewPaletteModal')
                }}>
                    <Text style={style.buttonText}>Add A New Palette</Text>
                </TouchableOpacity>
            }
        />
    )
};

const style = StyleSheet.create({
    list: {
        padding: 10,
        backgroundColor: 'white'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'teal',
        marginBottom: 10
    }
});

export default Home;