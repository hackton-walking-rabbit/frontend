import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ChatPage</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242C23',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
