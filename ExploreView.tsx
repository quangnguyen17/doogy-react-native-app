import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
// components
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native-appearance';
// icons
import heart from './assets/heart.png';
import collections from './assets/collections.png';

const { width } = Dimensions.get('window');

const scale = 16 / 9;
const CELL_WIDTH = (width - 32) / 2;
const CELL_HEIGHT = CELL_WIDTH * scale;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        margin: 4,
        borderRadius: 16,
    },
});

const ExploreView = () => {
    const scheme = useColorScheme();

    const navigation = useNavigation();

    const { bottom } = useSafeAreaInsets();

    const [images, setImages] = useState<string[]>([]);

    const tintColor = useMemo(() => (scheme === 'dark' ? 'white' : 'black'), [scheme]);
    const backgroundColor = useMemo(() => (scheme === 'dark' ? 'black' : 'white'), [scheme]);

    useEffect(() => {
        seeMoreHandler();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Text
                    style={{
                        color: tintColor,
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 24,
                        marginLeft: 12,
                    }}
                >
                    Explore
                </Text>
            ),
            title: '',
            headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 12 }}>
                    <TouchableOpacity style={{ marginRight: 4 }}>
                        <Image source={heart} style={{ width: 32, height: 32, tintColor }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={collections} style={{ width: 32, height: 32, tintColor }} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [tintColor, navigation]);

    const seeMoreHandler = async () => {
        const data: string[] = (await axios.get('https://dog.ceo/api/breeds/image/random/20')).data.message;
        setImages((images: string[]) => [...images, ...data]);
    };

    return (
        <>
            <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
            <View style={[styles.container, { backgroundColor }]}>
                <FlatList
                    contentContainerStyle={{ paddingTop: 4, paddingBottom: 8 + bottom }}
                    data={images}
                    numColumns={2}
                    initialNumToRender={4}
                    keyExtractor={(_, idx) => `${idx}`}
                    renderItem={({ item }: any) => {
                        const goToDog = () => navigation.navigate('ImageView', { uri: item });

                        return (
                            <TouchableOpacity onPress={goToDog}>
                                <Image source={{ uri: item }} style={styles.cell} />
                            </TouchableOpacity>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={seeMoreHandler}
                />
            </View>
        </>
    );
};

export default ExploreView;
