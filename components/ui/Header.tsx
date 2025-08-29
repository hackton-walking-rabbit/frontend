import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ArrowIcon from '../../assets/images/arrow-2.svg';

interface HeaderProps {
    title: string;
    showBackButton?: boolean; 
    onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBackPress }) => {
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
            {showBackButton && (
                <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                    <ArrowIcon width={24} height={24} fill="white" />
                </TouchableOpacity>
            )}
            <Text style={[styles.title, { fontFamily: 'Mynerve' }]}>{title}</Text>
        </View>
    );
};

    const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#338D29', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30, 
    },
    title: {
        fontSize: 20,
        paddingTop: 10,
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        left: 25,
        top: 55,
    },
});