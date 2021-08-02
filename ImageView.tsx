import React from 'react';
import { StyleSheet, Image, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

const ImageView = () => {
    const { params } = useRoute<any>();

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Image style={styles.image} source={{ uri: params.uri }} />
        </>
    );
};

export default ImageView;
