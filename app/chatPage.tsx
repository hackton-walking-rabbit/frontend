import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// npx expo install expo-linear-gradient

export default function ChatPage() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={styles.chatBox}>
                    {/* Top shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        style={[styles.shadowEdge, { top: 0, left: 0, right: 0, height: 15 }]}
                        start={{ x: 0, y: -1 }}
                        end={{ x: 0, y: 1 }}
                    />
                    {/* Bottom shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        style={[styles.shadowEdge, { bottom: 0, left: 0, right: 0, height: 15 }]}
                        start={{ x: 0, y: 2 }}
                        end={{ x: 0, y: 0 }}
                    />
                    {/* Left shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        start={{ x: -1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.shadowEdge, { top: 0, bottom: 0, left: 0, width: 15 }]}
                    />
                    {/* Right shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        start={{ x: 2, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={[styles.shadowEdge, { top: 0, bottom: 0, right: 0, width: 15 }]}
                    />
                    <Text style={styles.chatText}>/* 채팅창 */</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242C23',
        justifyContent: 'center',
        alignItems: 'center',
    },

    chatBox: {
        position: 'absolute',
        width: '90%',
        height: '70%',
        backgroundColor: '#095600',
        borderWidth: 7,
        borderColor: '#000000',
        borderRadius: 10,
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
    },

    shadowEdge: {
        position: 'absolute',
    },

    chatText: {
        color: 'white',
        fontWeight: 'bold',
    },
});