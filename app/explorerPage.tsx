import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExplorerPage() {
    return (
        <>
            <Stack.Screen options={{ title: 'Explorer Page' }} />
            <View style={styles.container}>
                <Text style={styles.title}>Explorer Page</Text>
                <Text style={styles.subtitle}>여기에 탐색 기능을 구현할 수 있어요!</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
});
