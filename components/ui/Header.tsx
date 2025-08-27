import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
    // 폰트 로드
    const [fontsLoaded] = useFonts({
        Mynerve: require('../../assets/fonts/Mynerve-Regular.ttf'),
    });

    // 폰트 로드 전 빈 화면
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { fontFamily: 'Mynerve', color: 'white' }]}>{title}</Text>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: '#338D29', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30, 
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
});